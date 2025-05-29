
-- =====================
-- 🟣   BYTE FORGE   🟣
-- =====================

-- Equipo de trabajo:
-- 🔹 Diego López Romero - A00837760
-- 🔸 Fernando Maggi Llerandi - A01736935
-- 🔹 Alejandro Guzmán Sánchez - A01736793
-- 🔸 Rodrigo López Guerra - A01737437

-- =====================================================
-- Triggers Automáticos
-- =====================================================

-- 🔹 Actualiza el cupo ocupado de un grupo cuando un participante cambia su estado.
-- 🔸 Ejemplo de uso:

-- Se activa automáticamente al actualizar estado de participante

-- 🔸 Definición:


DELIMITER $$
CREATE OR REPLACE TRIGGER actualizar_cupo
AFTER UPDATE ON participants
FOR EACH ROW
BEGIN
    IF OLD.status != 'Aprobada' AND NEW.status = 'Aprobada' THEN
        UPDATE groups
        SET occupied_places = occupied_places + 1
        WHERE id_group = NEW.id_group;

    ELSEIF OLD.status = 'Aprobada' AND NEW.status != 'Aprobada' THEN
        UPDATE groups
        SET occupied_places = GREATEST(0, occupied_places - 1)
        WHERE id_group = NEW.id_group;
    END IF;
END;
$$

-- 🔹 Cambia el estado de la sede según la cantidad de participantes aprobadas.
-- 🔸 Ejemplo de uso:

-- Se activa automáticamente al cambiar estado de participante aprobado

-- 🔸 Definición:

DELIMITER $$
CREATE OR REPLACE TRIGGER actualizar_estado_sede
AFTER UPDATE ON participants
FOR EACH ROW
BEGIN
    DECLARE v_id INT;
    DECLARE total_aprobadas INT;

    IF NEW.id_group IS NOT NULL THEN
        SELECT id_venue INTO v_id
        FROM groups
        WHERE id_group = NEW.id_group;
    ELSEIF NEW.preferred_group IS NOT NULL THEN
        SELECT id_venue INTO v_id
        FROM groups
        WHERE id_group = NEW.preferred_group;
    END IF;

    IF NEW.status = 'Aprobada' AND OLD.status != 'Aprobada' THEN
        IF v_id IS NOT NULL THEN
            UPDATE venues
            SET status = 'Registrada con participantes'
            WHERE id_venue = v_id
              AND status = 'Registrada sin participantes';
        END IF;
    END IF;

    IF OLD.status = 'Aprobada' AND NEW.status != 'Aprobada' THEN
        IF v_id IS NOT NULL THEN
            SELECT COUNT(*) INTO total_aprobadas
            FROM participants p
            JOIN groups g ON p.id_group = g.id_group
            WHERE g.id_venue = v_id AND p.status = 'Aprobada';

            IF total_aprobadas = 0 THEN
                UPDATE venues
                SET status = 'Registrada sin participantes'
                WHERE id_venue = v_id
                  AND status = 'Registrada con participantes';
            END IF;
        END IF;
    END IF;
END
$$ 

-- =====================================================
-- Funciones de Conteo / Métricas
-- =====================================================

-- 🔹 Devuelve en JSON el total de SEDES en sus diferentes estados
-- 🔸 Definición:

DELIMITER $$
CREATE OR REPLACE FUNCTION fun_total_sedes(
    tipo_usuario ENUM('superuser')
)
RETURNS JSON
DETERMINISTIC
BEGIN
    DECLARE v_id INT DEFAULT NULL;
    DECLARE total_pendientes INT DEFAULT 0;
    DECLARE total_sin_part INT DEFAULT 0;
    DECLARE total_con_part INT DEFAULT 0;
    DECLARE total_canceladas INT DEFAULT 0;
    DECLARE total_rechazadas INT DEFAULT 0;

    -- Conteos por estado
    SELECT COUNT(*) INTO total_pendientes
    FROM venues
    WHERE status = 'Pendiente';

    SELECT COUNT(*) INTO total_sin_part
    FROM venues
    WHERE status = 'Registrada sin participantes';

    SELECT COUNT(*) INTO total_con_part
    FROM venues
    WHERE status = 'Registrada con participantes';

    SELECT COUNT(*) INTO total_canceladas
    FROM venues
    WHERE status = 'Cancelada';

    SELECT COUNT(*) INTO total_rechazadas
    FROM venues
    WHERE status = 'Rechazada';

    -- Retornar como JSON
    RETURN JSON_OBJECT(
        'Pendiente', total_pendientes,
        'Registrada sin participantes', total_sin_part,
        'Registrada con participantes', total_con_part,
        'Cancelada', total_canceladas,
        'Rechazada', total_rechazadas
    );
END;
$$

-- 🔸 Ejemplo de uso:

-- DELIMITER ;
-- SELECT fun_total_part('superuser');

-- 🔹 Devuelve en JSON el total de participantes 'Aprobadas' y 'Pendientes' según el tipo de usuario.
-- 🔸 Definición:

DELIMITER $$

CREATE OR REPLACE FUNCTION fun_total_part(
    email_coordinadora VARCHAR(255),
    tipo_usuario ENUM('superuser', 'venue_coordinator'),
    id_sede_param INT
)
RETURNS JSON
DETERMINISTIC
BEGIN
    DECLARE v_id INT;
    DECLARE total_aceptadas INT DEFAULT 0;
    DECLARE total_pendientes INT DEFAULT 0;
    DECLARE total_rechazadas INT DEFAULT 0;
    DECLARE total_canceladas INT DEFAULT 0;

    IF tipo_usuario = 'venue_coordinator' THEN
        SELECT id_venue INTO v_id
        FROM venue_coordinators
        WHERE email COLLATE utf8mb4_general_ci = email_coordinadora COLLATE utf8mb4_general_ci;
    END IF;

    SELECT COUNT(*) INTO total_aceptadas
    FROM participants p
    JOIN groups g ON p.id_group = g.id_group
    WHERE p.status = 'Aprobada'
      AND (
        tipo_usuario = 'superuser'
        OR g.id_venue = v_id
      )
      AND (
        id_sede_param IS NULL
        OR g.id_venue = id_sede_param
      );

    SELECT COUNT(*) INTO total_pendientes
    FROM participants p
    LEFT JOIN groups g ON p.id_group = g.id_group
    LEFT JOIN groups pg ON p.preferred_group = pg.id_group
    WHERE p.status = 'Pendiente'
      AND (
        tipo_usuario = 'superuser'
        OR g.id_venue = v_id
        OR pg.id_venue = v_id
      )
      AND (
        id_sede_param IS NULL
        OR g.id_venue = id_sede_param
        OR pg.id_venue = id_sede_param
      );
    
    SELECT COUNT(*) INTO total_rechazadas
    FROM participants p
    LEFT JOIN groups g ON p.id_group = g.id_group
    LEFT JOIN groups pg ON p.preferred_group = pg.id_group
    WHERE p.status = 'Rechazada'
      AND (
        tipo_usuario = 'superuser'
        OR g.id_venue = v_id
        OR pg.id_venue = v_id
      )
      AND (
        id_sede_param IS NULL
        OR g.id_venue = id_sede_param
        OR pg.id_venue = id_sede_param
      );
    
    SELECT COUNT(*) INTO total_canceladas
    FROM participants p
    LEFT JOIN groups g ON p.id_group = g.id_group
    LEFT JOIN groups pg ON p.preferred_group = pg.id_group
    WHERE p.status = 'Cancelada'
      AND (
        tipo_usuario = 'superuser'
        OR g.id_venue = v_id
        OR pg.id_venue = v_id
      )
      AND (
        id_sede_param IS NULL
        OR g.id_venue = id_sede_param
        OR pg.id_venue = id_sede_param
      );

    RETURN JSON_OBJECT('Aprobadas', total_aceptadas, 'Pendientes', total_pendientes, 'Rechazadas', total_rechazadas, 'Canceladas', total_canceladas);
END;
$$

-- 🔸 Ejemplo de uso:

-- DELIMITER ;
-- SELECT fun_total_part('corta@tec.mx', 'venue_coordinator');

-- 🔹 Devuelve en JSON el total de colaboradores 'Aprobadas' y 'Pendientes' según el tipo de usuario.
-- 🔸 Definición:

DELIMITER $$
CREATE OR REPLACE FUNCTION fun_total_colab(
    email_coordinadora VARCHAR(255),
    tipo_usuario ENUM('superuser', 'venue_coordinator'),
    id_sede_param INT,
    rol_param VARCHAR(255) COLLATE utf8mb4_unicode_ci
)
RETURNS JSON
DETERMINISTIC
BEGIN
    DECLARE v_id INT;
    DECLARE total_aceptadas INT DEFAULT 0;
    DECLARE total_pendientes INT DEFAULT 0;
    DECLARE total_rechazadas INT DEFAULT 0;
    DECLARE total_canceladas INT DEFAULT 0;

    IF tipo_usuario = 'venue_coordinator' THEN
        SELECT id_venue INTO v_id
        FROM venue_coordinators
        WHERE email COLLATE utf8mb4_general_ci = email_coordinadora COLLATE utf8mb4_general_ci;
    END IF;

    SELECT COUNT(*) INTO total_aceptadas
    FROM collaborators c
    LEFT JOIN groups g ON c.id_group = g.id_group
    LEFT JOIN groups pg ON c.preferred_group = pg.id_group
    WHERE c.status = 'Aprobada'
      AND (
        tipo_usuario = 'superuser'
        OR g.id_venue = v_id
        OR pg.id_venue = v_id
      )
      AND (
        id_sede_param IS NULL
        OR g.id_venue = id_sede_param
        OR pg.id_venue = id_sede_param
      )
      AND (
        rol_param IS NULL
        OR c.role = rol_param
      );

    SELECT COUNT(*) INTO total_pendientes
    FROM collaborators c
    LEFT JOIN groups g ON c.id_group = g.id_group
    LEFT JOIN groups pg ON c.preferred_group = pg.id_group
    WHERE c.status = 'Pendiente'
      AND (
        tipo_usuario = 'superuser'
        OR g.id_venue = v_id
        OR pg.id_venue = v_id
      )
      AND (
        id_sede_param IS NULL
        OR g.id_venue = id_sede_param
        OR pg.id_venue = id_sede_param
      )
      AND (
        rol_param IS NULL
        OR c.preferred_role = rol_param
      );

    SELECT COUNT(*) INTO total_rechazadas
    FROM collaborators c
    LEFT JOIN groups g ON c.id_group = g.id_group
    LEFT JOIN groups pg ON c.preferred_group = pg.id_group
    WHERE c.status = 'Rechazada'
      AND (
        tipo_usuario = 'superuser'
        OR g.id_venue = v_id
        OR pg.id_venue = v_id
      )
      AND (
        id_sede_param IS NULL
        OR g.id_venue = id_sede_param
        OR pg.id_venue = id_sede_param
      )
      AND (
        rol_param IS NULL
        OR c.preferred_role = rol_param
      );

    SELECT COUNT(*) INTO total_canceladas
    FROM collaborators c
    LEFT JOIN groups g ON c.id_group = g.id_group
    LEFT JOIN groups pg ON c.preferred_group = pg.id_group
    WHERE c.status = 'Cancelada'
      AND (
        tipo_usuario = 'superuser'
        OR g.id_venue = v_id
        OR pg.id_venue = v_id
      )
      AND (
        id_sede_param IS NULL
        OR g.id_venue = id_sede_param
        OR pg.id_venue = id_sede_param
      )
      AND (
        rol_param IS NULL
        OR c.preferred_role = rol_param
      );

    RETURN JSON_OBJECT('Aprobadas', total_aceptadas, 'Pendientes', total_pendientes, 'Rechazadas', total_rechazadas, 'Canceladas', total_canceladas);
END;
$$

-- 🔸 Ejemplo de uso:

-- DELIMITER ;
-- SELECT fun_total_colab('corta@tec.mx', 'venue_coordinator');

-- 🔹 Devuelve el total de mentoras para la sede correspondiente.
-- 🔸 Definición:

DELIMITER $$
CREATE OR REPLACE FUNCTION fun_total_ment(
    email_coordinadora VARCHAR(255),
    tipo_usuario ENUM('superuser', 'venue_coordinator'),
    id_sede_param INT
)
RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE v_id INT;

    IF tipo_usuario = 'venue_coordinator' THEN
        SELECT id_venue INTO v_id
        FROM venue_coordinators
        WHERE email COLLATE utf8mb4_general_ci = email_coordinadora COLLATE utf8mb4_general_ci;

        RETURN (
            SELECT COUNT(*) FROM mentors
            WHERE id_venue = v_id
              AND (id_sede_param IS NULL OR id_venue = id_sede_param)
        );
    ELSE
        RETURN (
            SELECT COUNT(*) FROM mentors
            WHERE id_sede_param IS NULL OR id_venue = id_sede_param
        );
    END IF;
END;
$$


-- 🔸 Ejemplo de uso:

-- DELIMITER ;
-- SELECT fun_total_ment('corta@tec.mx', 'venue_coordinator');

-- 🔹 Devuelve el total de coordinadoras (generales y asistentes) por sede activa.
-- 🔸 Definición:

DELIMITER $$
CREATE OR REPLACE FUNCTION fun_total_coord(
    email_coordinadora VARCHAR(255),
    tipo_usuario ENUM('superuser', 'venue_coordinator'),
    id_sede_param INT
)
RETURNS JSON
DETERMINISTIC
BEGIN
    DECLARE v_id INT;
    DECLARE cg INT DEFAULT 0;
    DECLARE ca INT DEFAULT 0;
    DECLARE ci INT DEFAULT 0;

    IF tipo_usuario = 'venue_coordinator' THEN
        SELECT id_venue INTO v_id
        FROM venue_coordinators
        WHERE email COLLATE utf8mb4_general_ci = email_coordinadora COLLATE utf8mb4_general_ci;
    END IF;

    SELECT COUNT(*) INTO cg
    FROM venue_coordinators vc
    JOIN venues v ON vc.id_venue = v.id_venue
    WHERE v.status IN ('Registrada con participantes', 'Registrada sin participantes')
      AND (tipo_usuario = 'superuser' OR v.id_venue = v_id)
      AND (id_sede_param IS NULL OR v.id_venue = id_sede_param);

    SELECT COUNT(*) INTO ca
    FROM assistant_coordinators ac
    JOIN venues v ON ac.id_venue = v.id_venue
    WHERE ac.role = 'Coordinadora Asociada'
      AND v.status IN ('Registrada con participantes', 'Registrada sin participantes')
      AND (tipo_usuario = 'superuser' OR v.id_venue = v_id)
      AND (id_sede_param IS NULL OR v.id_venue = id_sede_param);

    SELECT COUNT(*) INTO ci
    FROM assistant_coordinators ac
    JOIN venues v ON ac.id_venue = v.id_venue
    WHERE ac.role = 'Coordinadora de informes'
      AND v.status IN ('Registrada con participantes', 'Registrada sin participantes')
      AND (tipo_usuario = 'superuser' OR v.id_venue = v_id)
      AND (id_sede_param IS NULL OR v.id_venue = id_sede_param);

    RETURN JSON_OBJECT('coord_gen', cg, 'coord_aso', ca, 'coord_info', ci);
END;
$$

-- 🔸 Ejemplo de uso:

-- DELIMITER ;
-- SELECT fun_total_coord('corta@tec.mx', 'venue_coordinator');


-- =====================================================
-- Procedimientos de Resumen / Reporte
-- =====================================================

-- 🔹 Muestra el resumen de participantes y colaboradores (pendientes y aprobadas) por sede.
-- 🔸 Definición:

DELIMITER $$
CREATE OR REPLACE PROCEDURE resumen_sede(
    IN tipo_usuario ENUM('superuser', 'venue_coordinator'),
    IN email_coordinadora VARCHAR(255)
)
BEGIN
    DECLARE v_id INT;

    IF tipo_usuario = 'venue_coordinator' THEN
        SELECT id_venue INTO v_id
        FROM venue_coordinators
        WHERE email COLLATE utf8mb4_general_ci = email_coordinadora COLLATE utf8mb4_general_ci;
    END IF;

    SELECT JSON_ARRAYAGG(
        JSON_OBJECT(
            'sede', v.name,
            'participantes', (
                SELECT COUNT(*) FROM participants p
                JOIN groups g ON p.id_group = g.id_group
                WHERE g.id_venue = v.id_venue AND (p.status = 'Aprobada')
            ),
            'colaboradores', (
                SELECT COUNT(*) FROM collaborators c
                JOIN groups g ON c.id_group = g.id_group
                WHERE g.id_venue = v.id_venue AND (c.status = 'Aprobada')
            ),
            'mentoras', (
                SELECT COUNT(*) FROM mentors m
                WHERE m.id_venue = v.id_venue AND v.status IN ('Registrada con participantes', 'Registrada sin participantes')
            ),
            'coordinadoras', (
              (
                SELECT COUNT(*) FROM venue_coordinators vc
                WHERE vc.id_venue = v.id_venue AND v.status IN ('Registrada con participantes', 'Registrada sin participantes')
              )
              +
              (
                SELECT COUNT(*) FROM assistant_coordinators ac
                WHERE ac.id_venue = v.id_venue AND v.status IN ('Registrada con participantes', 'Registrada sin participantes')
              )
            )
        )
    ) AS resumen
    FROM venues v
    WHERE tipo_usuario = 'superuser' OR v.id_venue = v_id;
END;
$$

-- 🔸 Ejemplo de uso:

-- DELIMITER ;
-- CALL resumen_sede('superuser', '');

-- 🔹 Agrupa los colaboradores por su rol en las sedes accesibles según el tipo de usuario.
-- 🔸 Definición:

DELIMITER $$
CREATE OR REPLACE PROCEDURE resumen_colaboradoras(
    IN tipo_usuario ENUM('superuser', 'venue_coordinator'),
    IN email_coordinadora VARCHAR(255),
    IN id_sede_param INT
)
BEGIN
    DECLARE v_id INT;

    IF tipo_usuario = 'venue_coordinator' THEN
        SELECT id_venue INTO v_id
        FROM venue_coordinators
        WHERE email COLLATE utf8mb4_general_ci = email_coordinadora COLLATE utf8mb4_general_ci;
    END IF;

    -- Tabla temporal de resultados
    DROP TEMPORARY TABLE IF EXISTS temp_colab_resumen;
    CREATE TEMPORARY TABLE temp_colab_resumen (
        status VARCHAR(255) COLLATE utf8mb4_unicode_ci,
        rol VARCHAR(255) COLLATE utf8mb4_unicode_ci,
        total INT
    );

    -- Tabla temporal de roles únicos (Aprobada usa role, otras usan preferred_role)
    DROP TEMPORARY TABLE IF EXISTS temp_roles;
    CREATE TEMPORARY TABLE temp_roles AS
    SELECT DISTINCT
    CAST(
        CASE
            WHEN c.status = 'Aprobada' THEN c.role
            ELSE c.preferred_role
        END AS CHAR CHARACTER SET utf8mb4
    ) COLLATE utf8mb4_unicode_ci AS rol
    FROM collaborators c;

    -- Tabla temporal de estados
    DROP TEMPORARY TABLE IF EXISTS temp_statuses;
    CREATE TEMPORARY TABLE temp_statuses (status VARCHAR(255) COLLATE utf8mb4_unicode_ci);
    INSERT INTO temp_statuses (status) VALUES ('Aprobada'), ('Pendiente'), ('Rechazada');

    -- Tabla real de conteos
    DROP TEMPORARY TABLE IF EXISTS temp_real_counts;
    CREATE TEMPORARY TABLE temp_real_counts (
        status VARCHAR(255) COLLATE utf8mb4_unicode_ci,
        rol VARCHAR(255) COLLATE utf8mb4_unicode_ci,
        total INT
    );

    INSERT INTO temp_real_counts (status, rol, total)
    SELECT
        CASE
            WHEN c.status = 'Cancelada' THEN 'Rechazada'
            ELSE c.status
        END AS status,
        CASE
            WHEN c.status = 'Aprobada' THEN c.role
            ELSE c.preferred_role
        END AS rol,
        COUNT(*) AS total
    FROM collaborators c
    LEFT JOIN groups g ON 
        CASE
            WHEN c.id_group IS NULL THEN c.preferred_group
            ELSE c.id_group
        END = g.id_group
    LEFT JOIN venues v ON g.id_venue = v.id_venue
    WHERE (
        tipo_usuario = 'superuser'
        OR v.id_venue = v_id
    )
    AND (
        id_sede_param IS NULL
        OR v.id_venue = id_sede_param
    )
    GROUP BY status, rol;

    -- Producto cruzado y merge
    INSERT INTO temp_colab_resumen (status, rol, total)
    SELECT
        s.status,
        r.rol,
        IFNULL(rc.total, 0) AS total
    FROM temp_roles r
    CROSS JOIN temp_statuses s
    LEFT JOIN temp_real_counts rc ON rc.status = s.status AND rc.rol = r.rol;

    -- Salida final como JSON
    SELECT JSON_ARRAYAGG(
        JSON_OBJECT(
            'status', status,
            'rol', rol,
            'total', total
        )
    ) AS resumen
    FROM temp_colab_resumen;

    -- Limpieza
    DROP TEMPORARY TABLE IF EXISTS temp_colab_resumen;
    DROP TEMPORARY TABLE IF EXISTS temp_roles;
    DROP TEMPORARY TABLE IF EXISTS temp_statuses;
    DROP TEMPORARY TABLE IF EXISTS temp_real_counts;
END;
$$

-- 🔸 Ejemplo de uso:

-- DELIMITER ;
-- CALL resumen_colaboradores('venue_coordinator', 'corta@tec.mx', 5);

-- 🔹 Agrupa las coordinadoras generales, asociadas e informes por sede.
-- 🔸 Definición:

DELIMITER $$
CREATE OR REPLACE PROCEDURE resumen_coordinadoras(
    IN tipo_usuario ENUM('superuser', 'venue_coordinator'),
    IN email_coordinadora VARCHAR(255),
    IN id_sede_param INT
)
BEGIN
    DECLARE v_id INT;

    IF tipo_usuario = 'venue_coordinator' THEN
        SELECT id_venue INTO v_id
        FROM venue_coordinators
        WHERE email COLLATE utf8mb4_general_ci = email_coordinadora COLLATE utf8mb4_general_ci;
    END IF;

    CREATE TEMPORARY TABLE IF NOT EXISTS temp_coordinadoras_resumen (
        rol VARCHAR(255),
        total INT
    );
    DELETE FROM temp_coordinadoras_resumen;

    INSERT INTO temp_coordinadoras_resumen (rol, total)
    SELECT
        'Coordinadora General',
        COUNT(*)
    FROM venue_coordinators vc
    JOIN venues v ON vc.id_venue = v.id_venue
    WHERE v.status IN ('Registrada con participantes', 'Registrada sin participantes')
      AND (tipo_usuario = 'superuser' OR v.id_venue = v_id)
      AND (id_sede_param IS NULL OR v.id_venue = id_sede_param);

    INSERT INTO temp_coordinadoras_resumen (rol, total)
    SELECT
        ac.role,
        COUNT(*)
    FROM assistant_coordinators ac
    JOIN venues v ON ac.id_venue = v.id_venue
    WHERE ac.role IN ('Coordinadora Asociada', 'Coordinadora de informes')
      AND v.status IN ('Registrada con participantes', 'Registrada sin participantes')
      AND (tipo_usuario = 'superuser' OR v.id_venue = v_id)
      AND (id_sede_param IS NULL OR v.id_venue = id_sede_param)
    GROUP BY ac.role;

    SELECT JSON_ARRAYAGG(
        JSON_OBJECT(
            'rol', rol,
            'total', total
        )
    ) AS resumen
    FROM temp_coordinadoras_resumen;

END;
$$

-- 🔸 Ejemplo de uso:

-- DELIMITER ;
-- CALL resumen_coordinadores('superuser', '');

-- 🔹 Llama funciones de conteo y devuelve el resumen global del evento.
-- 🔸 Definición:

DELIMITER $$
CREATE OR REPLACE PROCEDURE resumen_evento(
    IN tipo_usuario ENUM('superuser', 'venue_coordinator'),
    IN email_coordinadora VARCHAR(255),
    IN id_sede_param INT,
    IN rol_colab_param VARCHAR(255) COLLATE utf8mb4_unicode_ci
)
BEGIN
    DECLARE participantes_json JSON;
    DECLARE colaboradoras_json JSON;
    DECLARE total_mentoras INT DEFAULT 0;
    DECLARE coordinadoras_json JSON;
    DECLARE sedes_json JSON;

    SET participantes_json = fun_total_part(email_coordinadora, tipo_usuario, id_sede_param);
    SET colaboradoras_json = fun_total_colab(email_coordinadora, tipo_usuario, id_sede_param, rol_colab_param);
    SELECT fun_total_ment(email_coordinadora, tipo_usuario, id_sede_param) INTO total_mentoras;
    SET coordinadoras_json = fun_total_coord(email_coordinadora, tipo_usuario, id_sede_param);

    IF tipo_usuario = 'superuser' THEN
        SET sedes_json = fun_total_sedes(tipo_usuario);
    ELSE
        SET sedes_json = NULL;
    END IF;

    SELECT JSON_OBJECT(
        'total_participantes', participantes_json,
        'total_colaboradores', colaboradoras_json,
        'total_mentoras', total_mentoras,
        'total_coordinadoras', coordinadoras_json,
        'total_sedes', sedes_json
    ) AS resumen;
END;
$$

-- 🔸 Ejemplo de uso:

-- DELIMITER ;
-- CALL resumen_evento_json('superuser', NULL, 3, 'Staff', 'Coordinadora Asociada');

-- 🔹 Muestra la capacidad usada de los grupos (porcentaje y ocupación).
-- 🔸 Definición:

DELIMITER $$
CREATE OR REPLACE PROCEDURE capacidad_grupos(
    IN tipo_usuario ENUM('superuser', 'venue_coordinator') COLLATE utf8mb4_general_ci,
    IN email_coordinadora VARCHAR(255) COLLATE utf8mb4_general_ci
)
BEGIN
    DECLARE v_id INT;
    IF tipo_usuario = 'venue_coordinator' THEN
        SELECT id_venue INTO v_id
        FROM venue_coordinators
        WHERE email COLLATE utf8mb4_general_ci = email_coordinadora;
    END IF;

    SELECT 
        v.name AS sede,
        g.name AS grupo,
        g.max_places,
        g.occupied_places,
        ROUND((g.occupied_places / g.max_places) * 100, 2) AS porcentaje_ocupacion
    FROM groups g
    JOIN venues v ON g.id_venue = v.id_venue
    WHERE g.max_places IS NOT NULL AND g.occupied_places IS NOT NULL
      AND (tipo_usuario = 'superuser' OR g.id_venue = v_id)
    ORDER BY sede, grupo;
END;
$$

-- 🔸 Ejemplo de uso:

-- DELIMITER ;
-- CALL capacidad_grupos('superuser', '');


-- =====================================================
-- Funciones Auxiliares
-- =====================================================

-- 🔹 Cuenta participantes aprobadas en un grupo específico.
-- 🔸 Definición:

DELIMITER $$
CREATE OR REPLACE FUNCTION fun_part_aceptadas(grupo_id INT)
RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE total INT;
    SELECT COUNT(*) INTO total
    FROM participants
    WHERE id_group = grupo_id AND status = 'Aprobada';
    RETURN total;
END;
$$

-- 🔸 Ejemplo de uso:

-- DELIMITER ;
-- SELECT fun_part_aceptadas(1);

-- 🔹 Cuenta participantes interesadas (pendientes o aprobadas) por grupo.
-- 🔸 Definición:

DELIMITER $$
CREATE OR REPLACE FUNCTION fun_part_interesadas(grupo_id INT)
RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE total INT;

    SELECT COUNT(*) INTO total
    FROM participants
    WHERE status IN ('Aprobada', 'Pendiente')
      AND (
        id_group = grupo_id
        OR (id_group IS NULL AND preferred_group = grupo_id)
      );

    RETURN total;
END;
$$

-- 🔸 Ejemplo de uso:

-- DELIMITER ;
-- SELECT fun_part_interesadas(1);


-- =====================================================
-- Validación y Registro
-- =====================================================

-- 🔹 Verifica si hay cupo disponible para un nuevo participante.
-- 🔸 Definición:

DELIMITER $$
CREATE OR REPLACE PROCEDURE validar_capacidad_participante(
    IN id_grupo INT
)
BEGIN
    DECLARE cupo_max INT;
    DECLARE total_aprobadas INT;
    DECLARE total_interesadas INT;

    SELECT max_places INTO cupo_max
    FROM groups
    WHERE id_group = id_grupo;

    SELECT fun_part_aceptadas(id_grupo) INTO total_aprobadas;
    SELECT fun_part_interesadas(id_grupo) INTO total_interesadas;

    IF total_aprobadas >= cupo_max THEN
        SELECT 'El grupo ya está lleno con participantes aprobadas.' AS mensaje;
    ELSEIF total_interesadas >= cupo_max THEN
        SELECT 'El grupo ya está lleno por interesadas (aprobadas + pendientes). ¿Deseas continuar?' AS mensaje;
    ELSE
        SELECT 'Cupo disponible. Puedes continuar con el registro.' AS mensaje;
    END IF;
END;
$$ 

-- 🔸 Ejemplo de uso:

-- DELIMITER ;
-- CALL validar_capacidad_participante(1);

-- 🔹 Registra un nuevo participante si hay capacidad.
-- 🔸 Definición:

DELIMITER $$
CREATE OR REPLACE PROCEDURE registrar_part(
    -- Datos del Participante
    IN nombre_part VARCHAR(255),
    IN paterno_part VARCHAR(255),
    IN materno_part VARCHAR(255),
    IN email_part VARCHAR(255),
    IN grado_part VARCHAR(255),
    IN escolaridad_part VARCHAR(255),
    IN archivo_permiso BLOB,
    IN archivo_permiso_path VARCHAR(255),
    IN id_grupo INT,

    -- Datos del Tutor
    IN nombre_tutor VARCHAR(255),
    IN paterno_tutor VARCHAR(255),
    IN materno_tutor VARCHAR(255),
    IN email_tutor VARCHAR(255) COLLATE utf8mb4_general_ci,
    IN celular_tutor VARCHAR(255)
)
BEGIN
    DECLARE id_tutor_nuevo INT;
    DECLARE cupo_max INT;
    DECLARE total_aprobadas INT;
    DECLARE total_interesadas INT;

    SELECT max_places INTO cupo_max
    FROM groups
    WHERE id_group = id_grupo;

    IF cupo_max IS NULL THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El grupo especificado no existe.';
    END IF;

    SELECT fun_part_aceptadas(id_grupo) INTO total_aprobadas;
    SELECT fun_part_interesadas(id_grupo) INTO total_interesadas;

    IF total_aprobadas >= cupo_max THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El grupo ya está lleno con participantes aprobadas.';
    END IF;

    SELECT id_tutor INTO id_tutor_nuevo
    FROM tutors
    WHERE email COLLATE utf8mb4_general_ci = email_tutor
    LIMIT 1;

    IF id_tutor_nuevo IS NULL THEN
        INSERT INTO tutors (name, paternal_name, maternal_name, email, phone_number)
        VALUES (nombre_tutor, paterno_tutor, materno_tutor, email_tutor, celular_tutor);
        SET id_tutor_nuevo = LAST_INSERT_ID();
    END IF;

    INSERT INTO participants (
        name, paternal_name, maternal_name, email,
        year, education, participation_file, participation_file_path, preferred_group, id_tutor, status
    )
    VALUES (
        nombre_part, paterno_part, materno_part, email_part,
        grado_part, escolaridad_part, archivo_permiso, archivo_permiso_path,
        id_grupo, id_tutor_nuevo, 'Pendiente'
    );
END;
$$ 

-- 🔸 Ejemplo de uso:

-- DELIMITER ;
-- CALL registrar_part('Ana', 'Lopez', 'Mendez', 'ana@tec.mx', '2025', 'Preparatoria', 'test.pdf', 1, 'Jose', 'Lopez', 'Perez', 'jose.tutor@tec.mx', '+52 222 111 2233');

-- 🔹 Aprueba un participante considerando cupo disponible.
-- 🔸 Definición:

DELIMITER $$
CREATE OR REPLACE PROCEDURE aprobar_part(
    IN participante_id INT,
    IN grupo_asignado_id INT
)
BEGIN
    DECLARE grupo_actual INT;
    DECLARE grupo_preferido_id INT;
    DECLARE grupo_final_id INT;
    DECLARE total_aprobadas INT;
    DECLARE cupo_max INT;

    SELECT id_group, preferred_group INTO grupo_actual, grupo_preferido_id
    FROM participants
    WHERE id_participant = participante_id;

    IF grupo_actual IS NOT NULL THEN
        SELECT max_places INTO cupo_max FROM groups WHERE id_group = grupo_actual;
        SELECT fun_part_aceptadas(grupo_actual) INTO total_aprobadas;

        IF total_aprobadas >= cupo_max THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'El grupo asignado ya está lleno con participantes aprobadas.';
        END IF;

        UPDATE participants
        SET status = 'Aprobada'
        WHERE id_participant = participante_id;

    ELSE
        IF grupo_asignado_id IS NULL THEN
            SET grupo_final_id = grupo_preferido_id;
	ELSE
    SET grupo_final_id = grupo_asignado_id;
	END IF;


        SELECT max_places INTO cupo_max FROM groups WHERE id_group = grupo_final_id;
        SELECT fun_part_aceptadas(grupo_final_id) INTO total_aprobadas;

        IF total_aprobadas >= cupo_max THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'El grupo seleccionado ya está lleno con participantes aprobadas.';
        END IF;

        UPDATE participants
        SET id_group = grupo_final_id,
            status = 'Aprobada'
        WHERE id_participant = participante_id;
    END IF;
END;
$$

-- 🔸 Ejemplo de uso:

-- DELIMITER ;
-- CALL aprobar_part(1, NULL);

-- 🔹 Registra un nuevo colaborador evitando duplicados.
-- 🔸 Definición:

DELIMITER $$
CREATE OR REPLACE PROCEDURE registrar_colab(
    IN nombre VARCHAR(255),
    IN paterno VARCHAR(255),
    IN materno VARCHAR(255),
    IN email VARCHAR(255),
    IN telefono VARCHAR(255),
    IN universidad VARCHAR(255),
    IN carrera VARCHAR(255),
    IN semestre VARCHAR(255),
    IN rol_preferido VARCHAR(255),
    IN idioma_preferido VARCHAR(255),
    IN nivel_preferido VARCHAR(255),
    IN id_venue_preferido INT,
    IN genero VARCHAR(255)
)
BEGIN
    DECLARE existe INT;

    SELECT COUNT(*) INTO existe
    FROM collaborators
    WHERE collaborators.email COLLATE utf8mb4_general_ci = email COLLATE utf8mb4_general_ci
    OR collaborators.phone_number COLLATE utf8mb4_general_ci = telefono COLLATE utf8mb4_general_ci;

    IF existe > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Ya existe un colaborador registrado con estos datos.';
    END IF;

    INSERT INTO collaborators (
        name, paternal_name, maternal_name, email, phone_number,
        college, degree, semester,
        preferred_role, preferred_language, preferred_level,
        preferred_venue, gender
    )
    VALUES (
        nombre, paterno, materno, email, telefono,
        universidad, carrera, semestre,
        rol_preferido, idioma_preferido, nivel_preferido,
        id_venue_preferido, genero
    );
END;
$$

-- 🔸 Ejemplo de uso:

-- DELIMITER ;
-- CALL registrar_colab('María', 'Perez', 'Gomez', 'maria@tec.mx', '+52 222 111 3344', 'ITESM', 'Ingeniería', '6', 'Facilitadora', 'Español', 'Básico', 1, 'Mujer');

-- 🔹 Aprueba colaborador con datos completos, según sus preferencias.
-- 🔸 Definición:

DELIMITER $$
CREATE OR REPLACE PROCEDURE aprobar_colab(
    IN colaboradora_id INT,
    IN nuevo_rol ENUM('Instructora', 'Facilitadora', 'Staff', 'Pendiente'),
    IN nuevo_idioma ENUM('Español', 'Inglés', 'Pendiente'),
    IN nuevo_nivel VARCHAR(255),
    IN nuevo_grupo_id INT
)
BEGIN
    DECLARE rol_final VARCHAR(20);
    DECLARE idioma_final VARCHAR(20);
    DECLARE nivel_final VARCHAR(255);
    DECLARE grupo_final_id INT;

    DECLARE preferido_rol VARCHAR(255);
    DECLARE preferido_idioma VARCHAR(255);
    DECLARE preferido_nivel VARCHAR(255);
    DECLARE id_preferido_grupo INT;

    SELECT preferred_role, preferred_language, preferred_level, preferred_group
    INTO preferido_rol, preferido_idioma, preferido_nivel, id_preferido_grupo
    FROM collaborators
    WHERE id_collaborator = colaboradora_id;

    SET rol_final = IF(nuevo_rol IS NULL OR nuevo_rol = 'Pendiente', preferido_rol, nuevo_rol);
    SET idioma_final = IF(nuevo_idioma IS NULL OR nuevo_idioma = 'Pendiente', preferido_idioma, nuevo_idioma);
    SET nivel_final = IF(nuevo_nivel IS NULL OR nuevo_nivel = '', preferido_nivel, nuevo_nivel);
    SET grupo_final_id = IF(nuevo_grupo_id IS NULL, id_preferido_grupo, nuevo_grupo_id);

    UPDATE collaborators
    SET
        role = rol_final,
        language = idioma_final,
        level = nivel_final,
        id_group = grupo_final_id,
        status = 'Aprobada'
    WHERE id_collaborator = colaboradora_id;
END;
$$

-- 🔸 Ejemplo de uso:

-- DELIMITER ;
-- CALL aprobar_colab(1, 'Facilitadora', NULL, 'Básico', 1);

-- 🔹 Crea un grupo y una mentora en una sede activa.
-- 🔸 Definición:

DELIMITER $$
CREATE OR REPLACE PROCEDURE registrar_grupo(
    -- Datos del grupo
    IN nombre_grupo VARCHAR(255) COLLATE utf8mb4_unicode_ci,
    IN fecha_inicio DATE,
    IN dias_no_curso TEXT COLLATE utf8mb4_unicode_ci,
    IN id_sede INT,
    IN cupo_maximo INT,
    IN idioma_grupo VARCHAR(255) COLLATE utf8mb4_unicode_ci,
    IN ubicacion VARCHAR(255) COLLATE utf8mb4_unicode_ci,
    IN nivel VARCHAR(255) COLLATE utf8mb4_unicode_ci,
    IN modalidad VARCHAR(255) COLLATE utf8mb4_unicode_ci,
    IN hora_inicio TIME,
    IN hora_fin TIME,

    -- Datos de la mentora
    IN nombre_mentora VARCHAR(255) COLLATE utf8mb4_unicode_ci,
    IN paterno_mentora VARCHAR(255) COLLATE utf8mb4_unicode_ci,
    IN materno_mentora VARCHAR(255) COLLATE utf8mb4_unicode_ci,
    IN email_mentora VARCHAR(255) COLLATE utf8mb4_unicode_ci,
    IN telefono_mentora VARCHAR(255) COLLATE utf8mb4_unicode_ci
)
BEGIN
    DECLARE grupo_existente INT;
    DECLARE mentora_existente INT;
    DECLARE id_nueva_mentora INT;
    DECLARE id_nuevo_grupo INT;
    DECLARE fecha_fin DATE;
    DECLARE dias_excluidos INT DEFAULT 0;
    DECLARE v_cadena TEXT COLLATE utf8mb4_unicode_ci;
    DECLARE v_fecha VARCHAR(255) COLLATE utf8mb4_unicode_ci;
    DECLARE estado_sede VARCHAR(255);

    SELECT status INTO estado_sede FROM venues WHERE id_venue = id_sede;

    IF estado_sede NOT IN ('Registrada con participantes', 'Registrada sin participantes') THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'La sede no está en estado activo. No se pueden crear grupos.';
    END IF;

    SELECT COUNT(*) INTO grupo_existente
    FROM groups
    WHERE name COLLATE utf8mb4_unicode_ci = nombre_grupo AND id_venue = id_sede;

    IF grupo_existente > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Ya existe un grupo con ese nombre en la misma sede.';
    END IF;

    SELECT COUNT(*) INTO mentora_existente
    FROM mentors
    WHERE email COLLATE utf8mb4_unicode_ci = email_mentora
      OR phone_number COLLATE utf8mb4_unicode_ci = telefono_mentora;

    IF mentora_existente > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Los teléfonos e emails pueden estar vinculados a una sola mentora.';
    END IF;

    INSERT INTO mentors (
        name, paternal_name, maternal_name, email, phone_number, id_venue
    )
    VALUES (
        nombre_mentora, paterno_mentora, materno_mentora, email_mentora, telefono_mentora, id_sede
    );

    SET id_nueva_mentora = LAST_INSERT_ID();

    IF dias_no_curso IS NOT NULL AND dias_no_curso != '' THEN
        SET @dias = dias_no_curso;
        SET dias_excluidos = 1;

        WHILE LOCATE(',', @dias) > 0 DO
            SET dias_excluidos = dias_excluidos + 1;
            SET @dias = SUBSTRING(@dias, LOCATE(',', @dias) + 1);
        END WHILE;
    END IF;

    SET fecha_fin = DATE_ADD(fecha_inicio, INTERVAL (6 + dias_excluidos) DAY);

    INSERT INTO groups (
        name, start_date, end_date, id_mentor, id_venue,
        max_places, language, location, level, mode, start_hour, end_hour
    ) VALUES (
        nombre_grupo, fecha_inicio, fecha_fin, id_nueva_mentora, id_sede,
        cupo_maximo, idioma_grupo, ubicacion, nivel, modalidad, hora_inicio, hora_fin
    );

    SET id_nuevo_grupo = LAST_INSERT_ID();

    IF dias_no_curso IS NOT NULL AND dias_no_curso != '' THEN
        SET v_cadena = dias_no_curso;

        WHILE LOCATE(',', v_cadena) > 0 DO
            SET v_fecha = TRIM(SUBSTRING_INDEX(v_cadena, ',', 1));
            INSERT INTO excluded_days (id_group, excluded_date)
            VALUES (id_nuevo_grupo, STR_TO_DATE(v_fecha, '%Y-%m-%d'));
            SET v_cadena = SUBSTRING(v_cadena, LOCATE(',', v_cadena) + 1);
        END WHILE;

        INSERT INTO excluded_days (id_group, excluded_date)
        VALUES (id_nuevo_grupo, STR_TO_DATE(TRIM(v_cadena), '%Y-%m-%d'));
    END IF;
END;
$$

-- 🔸 Ejemplo de uso:

-- DELIMITER ;
-- CALL registrar_grupo('Grupo Alpha', '2025-07-01', '', 2, 20, 'Español', 'Aula B', 'Básico', 'Presencial', '10:00:00', '13:00:00', 'Carla', 'Mendoza', 'López', 'carla@tec.mx', '+52 123 456 7890');


-- =====================================================
-- Registro de Sedes
-- =====================================================

-- 🔹 Registra una nueva sede con sus coordinadoras.
-- 🔸 Definición:

DELIMITER $$
CREATE OR REPLACE PROCEDURE registrar_sede(
    -- Datos de la sede
    IN nombre_sede VARCHAR(255),
    IN pais_sede VARCHAR(255),
    IN region_sede VARCHAR(255),
    IN direccion_sede VARCHAR(255),
    IN logo BLOB,
    IN convocatoria BLOB,
    IN logo_path VARCHAR(255),
    IN convocatoria_path VARCHAR(255),

    -- Coordinadora General
    IN nombre_general VARCHAR(255),
    IN paterno_general VARCHAR(255),
    IN materno_general VARCHAR(255),
    IN email_general VARCHAR(255),
    IN celular_general VARCHAR(255),
    IN sexo_general VARCHAR(255),
    IN usuario_general VARCHAR(255),
    IN contrasena_general VARCHAR(255),
    IN imagen_perfil BLOB,
    IN imagen_perfil_path VARCHAR(255),

    -- Coordinadora Asociada
    IN nombre_asociada VARCHAR(255),
    IN paterno_asociada VARCHAR(255),
    IN materno_asociada VARCHAR(255),
    IN email_asociada VARCHAR(255),
    IN celular_asociada VARCHAR(255),

    -- Coordinadora de Informes (STAFF)
    IN nombre_staff VARCHAR(255),
    IN paterno_staff VARCHAR(255),
    IN materno_staff VARCHAR(255),
    IN email_staff VARCHAR(255),
    IN celular_staff VARCHAR(255),

    -- Coordinadora de Informes (PARTICIPANTES)
    IN nombre_part VARCHAR(255),
    IN paterno_part VARCHAR(255),
    IN materno_part VARCHAR(255),
    IN email_part VARCHAR(255),
    IN celular_part VARCHAR(255)
)
BEGIN
    DECLARE nueva_sede_id INT;

    -- Insert into venues with file paths
    INSERT INTO venues (
        name, 
        country,
        state,
        address, 
        logo, 
        participation_file, 
        logo_path, 
        participation_file_path, 
        status
    )
    VALUES (
        nombre_sede, 
        pais_sede,
        region_sede, 
        direccion_sede, 
        logo, 
        convocatoria, 
        logo_path,
        convocatoria_path, 
        'Pendiente'
    );

    SET nueva_sede_id = LAST_INSERT_ID();

    -- Insert General Coordinator with profile image path
    INSERT INTO venue_coordinators (
        name, 
        paternal_name, 
        maternal_name, 
        email, 
        phone_number,
        gender, 
        username, 
        password, 
        profile_image, 
        profile_image_path, 
        id_venue
    )
    VALUES (
        nombre_general, 
        paterno_general, 
        materno_general, 
        email_general, 
        celular_general,
        sexo_general, 
        usuario_general, 
        contrasena_general, 
        imagen_perfil, 
        imagen_perfil_path, 
        nueva_sede_id
    );

    IF nombre_asociada IS NOT NULL AND nombre_asociada != '' THEN
        INSERT INTO assistant_coordinators (
            name, paternal_name, maternal_name, email, phone_number, id_venue, role
        )
        VALUES (
            nombre_asociada, paterno_asociada, materno_asociada, email_asociada, celular_asociada,
            nueva_sede_id, 'Coordinadora Asociada'
        );
    END IF;

    IF nombre_staff IS NOT NULL AND nombre_staff != '' THEN
        INSERT INTO assistant_coordinators (
            name, paternal_name, maternal_name, email, phone_number, id_venue, role
        )
        VALUES (
            nombre_staff, paterno_staff, materno_staff, email_staff, celular_staff,
            nueva_sede_id, 'Coordinadora de informes'
        );
    END IF;

    IF nombre_part IS NOT NULL AND nombre_part != '' THEN
        INSERT INTO assistant_coordinators (
            name, paternal_name, maternal_name, email, phone_number, id_venue, role
        )
        VALUES (
            nombre_part, paterno_part, materno_part, email_part, celular_part,
            nueva_sede_id, 'Coordinadora de informes'
        );
    END IF;
END;
$$


DELIMITER $$

CREATE OR REPLACE PROCEDURE registrar_log (
  IN p_action VARCHAR(50),
  IN p_table_name VARCHAR(50),
  IN p_message TEXT,
  IN p_username VARCHAR(255),
  IN p_id_venue INT
)
BEGIN
  INSERT INTO audit_log (action, table_name, message, username, id_venue)
  VALUES (
    p_action,
    p_table_name,
    p_message,
    p_username,
    p_id_venue
  );
END$$

DELIMITER ;


DELIMITER //

CREATE OR REPLACE PROCEDURE cancelar_sede(
    IN p_id_venue INT,
    IN p_username VARCHAR(255)
)
BEGIN
    DECLARE existe INT;
    DECLARE current_status VARCHAR(255);
    DECLARE grupo_id INT;
    DECLARE done INT DEFAULT 0;
    
    -- Cursor para recorrer los grupos asociados a la sede
    DECLARE grupo_cursor CURSOR FOR 
        SELECT id_group 
        FROM groups 
        WHERE id_venue = p_id_venue AND status = 'Aprobada';
    
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

    -- Verifica si la sede existe
    SELECT COUNT(*) INTO existe
    FROM venues
    WHERE id_venue = p_id_venue;

    IF existe = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'La sede no existe.';
    END IF;

    -- Obtiene el estado actual de la sede
    SELECT status INTO current_status
    FROM venues
    WHERE id_venue = p_id_venue;

    -- Verifica si la sede puede ser cancelada
    IF current_status NOT IN ('Registrada sin participantes', 'Registrada con participantes') THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Solo se pueden cancelar sedes en estado Registrada sin participantes o Registrada con participantes.';
    END IF;

    -- Inicia una transacción para asegurar consistencia
    START TRANSACTION;

    -- Abre el cursor para recorrer los grupos
    OPEN grupo_cursor;

    read_loop: LOOP
        FETCH grupo_cursor INTO grupo_id;
        IF done THEN
            LEAVE read_loop;
        END IF;

        -- Llama al procedimiento existente para cancelar el grupo
        CALL cambiar_estado_grupo(grupo_id, p_username, p_id_venue, 'desactivar');
    END LOOP;

    -- Cierra el cursor
    CLOSE grupo_cursor;

    -- Actualiza el estado de la sede a Cancelada
    UPDATE venues
    SET status = 'Cancelada',
        updated_at = NOW()
    WHERE id_venue = p_id_venue;

    -- Registra la cancelación de la sede en el log
    CALL registrar_log(
        'UPDATE',
        'venues',
        CONCAT('Se canceló la sede con ID ', p_id_venue),
        p_username,
        p_id_venue
    );

    -- Confirma la transacción
    COMMIT;

END //

DELIMITER ;


DELIMITER //

CREATE OR REPLACE PROCEDURE cambiar_estado_grupo(
    IN p_id_group INT,
    IN p_username VARCHAR(255),
    IN p_id_venue INT,
    IN p_accion VARCHAR(10)
)
BEGIN
    DECLARE existe INT;
    DECLARE p_status VARCHAR(255);
    DECLARE nuevo_status VARCHAR(255);

    -- Verifica si el grupo existe
    SELECT COUNT(*) INTO existe
    FROM groups
    WHERE id_group = p_id_group;

    IF existe = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El grupo no existe.';
    END IF;

    -- Obtiene el estado actual del grupo
    SELECT status INTO p_status
    FROM groups
    WHERE id_group = p_id_group;

    -- Define la lógica de acción
    IF p_accion = 'desactivar' THEN
        IF p_status != 'Aprobada' THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Solo se pueden desactivar los grupos aprobados.';
        END IF;

        -- Actualiza estado y relación de participantes
        UPDATE participants
        SET status = 'Pendiente',
            id_group = NULL
        WHERE id_group = p_id_group AND status = 'Aprobada';

        -- Actualiza estado y relación de colaboradores
        UPDATE collaborators
        SET status = 'Pendiente',
            id_group = NULL,
            role = 'Pendiente'
        WHERE id_group = p_id_group AND status = 'Aprobada';

        -- Registra en logs la cancelación de participantes y colaboradores
        CALL registrar_log(
            'UPDATE',
            'collaborators',
            CONCAT('Grupo cancelado (ID ', p_id_group, '): colaboradores aprobados pasaron a Pendiente y se desasignaron.'),
            p_username,
            p_id_venue
        );

        CALL registrar_log(
            'UPDATE',
            'participants',
            CONCAT('Grupo cancelado (ID ', p_id_group, '): participantes aprobados pasaron a Pendiente y se desasignaron.'),
            p_username,
            p_id_venue
        );

        SET nuevo_status = 'Cancelada';

    ELSEIF p_accion = 'activar' THEN
        IF p_status != 'Cancelada' THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Solo se pueden activar los grupos cancelados.';
        END IF;
        SET nuevo_status = 'Aprobada';

    ELSE
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Acción no válida.';
    END IF;

    -- Cambia el estado del grupo
    UPDATE groups
    SET status = nuevo_status
    WHERE id_group = p_id_group;

    -- Registra el cambio de estado
    CALL registrar_log(
        'UPDATE',
        'groups',
        CONCAT('Se ', p_accion, ' el grupo con ID ', p_id_group),
        p_username,
        p_id_venue
    );
END //

DELIMITER ;





DELIMITER //

CREATE OR REPLACE FUNCTION fun_validar_cupo(
    idGrupo INT,
    rol VARCHAR(255)
)
RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE cupoMaximo INT;
    DECLARE cupoActual INT;
    DECLARE disponible INT;
    DECLARE grupoStatus VARCHAR(255);

    -- Verificar estado del grupo
    SELECT status INTO grupoStatus FROM groups WHERE id_group = idGrupo;

    IF grupoStatus <> 'Aprobada' THEN
        RETURN 0; -- Grupo cancelado o no activo
    END IF;

    -- Asignar cupo máximo según el rol
    IF rol = 'Instructora' THEN    
        SET cupoMaximo = 1;
    ELSEIF rol = 'Facilitadora' THEN  
        SET cupoMaximo = 2;
    ELSEIF rol = 'Staff' THEN   
        SET cupoMaximo = 1;
    ELSE
        SET cupoMaximo = 0; -- Rol no permitido
    END IF;

    -- Contar cuántas personas con ese rol ya están en ese grupo y aprobadas
    SELECT COUNT(*) INTO cupoActual
    FROM collaborators
    WHERE id_group = idGrupo AND role = rol AND status = 'Aprobada';

    -- Comparar si hay espacio
    IF cupoActual < cupoMaximo THEN
        SET disponible = 1;
    ELSE
        SET disponible = 0;
    END IF;

    RETURN disponible;
END //

DELIMITER ;



DELIMITER //

CREATE OR REPLACE PROCEDURE gestionar_solicitud_colab(
    IN id_colab INT,
    IN grupo_alternativo INT -- Puede ser NULL si solo se desea rechazar
)
BEGIN
    DECLARE grupo_preferido INT;
    DECLARE rol_colab VARCHAR(255);
    DECLARE status_colab VARCHAR(255);
    DECLARE status_grupo_preferido VARCHAR(255);
    DECLARE status_grupo_alternativo VARCHAR(255);
    DECLARE cupo_disponible_preferido INT;
    DECLARE cupo_disponible_alternativo INT;
    DECLARE preferred_level_colab VARCHAR(255);
    DECLARE preferred_language_colab VARCHAR(255);

    main_block: BEGIN

        -- Validar que el colaborador esté en estado Pendiente
        SELECT status INTO status_colab
        FROM collaborators
        WHERE id_collaborator = id_colab;

        IF status_colab != 'Pendiente' THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Solo puedes gestionar solicitudes en estado Pendiente.';  
        END IF;

        -- Obtener grupo preferido, rol, nivel y lenguaje preferidos
        SELECT preferred_group, role, preferred_level, preferred_language
        INTO grupo_preferido, rol_colab, preferred_level_colab, preferred_language_colab
        FROM collaborators
        WHERE id_collaborator = id_colab;

        -- Si no tiene grupo preferido
        IF grupo_preferido IS NULL THEN
            IF grupo_alternativo IS NULL THEN
                UPDATE collaborators
                SET status = 'Rechazada'
                WHERE id_collaborator = id_colab;

                SELECT 'Colaborador sin grupo preferido y sin alternativo. Solicitud rechazada.' AS mensaje; 
                LEAVE main_block;
            ELSE
                SET grupo_preferido = grupo_alternativo; -- usar el alternativo como único intento
            END IF;
        END IF;

        -- Verificar estado del grupo preferido
        SELECT status INTO status_grupo_preferido
        FROM groups
        WHERE id_group = grupo_preferido;

        IF status_grupo_preferido <> 'Aprobada' THEN
            IF grupo_alternativo IS NULL THEN
                UPDATE collaborators
                SET status = 'Rechazada'
                WHERE id_collaborator = id_colab;

                SELECT 'Grupo preferido cancelado o no aprobado. Solicitud rechazada.' AS mensaje; 
                LEAVE main_block;
            END IF;
        END IF;

        -- Verificar cupo disponible en grupo preferido
        SET cupo_disponible_preferido = fun_validar_cupo(grupo_preferido, rol_colab);

        IF cupo_disponible_preferido = 1 THEN
            UPDATE collaborators
            SET id_group = grupo_preferido,
                status = 'Aprobada',
                level = preferred_level_colab,
                language = preferred_language_colab
            WHERE id_collaborator = id_colab;

            SELECT 'Solicitud aceptada en grupo preferido.' AS mensaje; 
            LEAVE main_block;
        END IF;

        -- Si no hay cupo en preferido, intentar con alternativo
        IF grupo_alternativo IS NULL THEN
            UPDATE collaborators
            SET status = 'Rechazada'
            WHERE id_collaborator = id_colab;

            SELECT 'Grupo preferido lleno y sin alternativo. Solicitud rechazada.' AS mensaje;   
            LEAVE main_block;
        END IF;

        -- Verificar estado del grupo alternativo
        SELECT status INTO status_grupo_alternativo
        FROM groups
        WHERE id_group = grupo_alternativo;

        IF status_grupo_alternativo <> 'Aprobada' THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'El grupo alternativo no está aprobado.';   
        END IF;

        -- Verificar cupo en grupo alternativo
        SET cupo_disponible_alternativo = fun_validar_cupo(grupo_alternativo, rol_colab);

        IF cupo_disponible_alternativo = 1 THEN
            UPDATE collaborators
            SET id_group = grupo_alternativo,
                status = 'Aprobada',
                level = preferred_level_colab,
                language = preferred_language_colab
            WHERE id_collaborator = id_colab;

            SELECT 'Solicitud aceptada en grupo alternativo.' AS mensaje; 
        ELSE
            UPDATE collaborators
            SET status = 'Rechazada'
            WHERE id_collaborator = id_colab;

            SELECT 'Ambos grupos llenos. Solicitud rechazada.' AS mensaje; 
        END IF;

    END main_block;
END //

DELIMITER ;


DELIMITER //

CREATE OR REPLACE FUNCTION fun_validar_cupo_roles(idGrupo INT)
RETURNS JSON
DETERMINISTIC
BEGIN
    DECLARE grupoStatus VARCHAR(255);
    DECLARE instructoraCount INT;
    DECLARE facilitadoraCount INT;
    DECLARE staffCount INT;
    DECLARE availableRoles JSON;

    -- Verificar estado del grupo
    SELECT status INTO grupoStatus FROM groups WHERE id_group = idGrupo;
    IF grupoStatus <> 'Aprobada' THEN
        RETURN JSON_OBJECT(
            'Instructora', 0,
            'Facilitadora', 0,
            'Staff', 0
        );
    END IF;

    -- Contar colaboradores aprobados por rol en el grupo
    SELECT 
        SUM(CASE WHEN role = 'Instructora' THEN 1 ELSE 0 END),
        SUM(CASE WHEN role = 'Facilitadora' THEN 1 ELSE 0 END),
        SUM(CASE WHEN role = 'Staff' THEN 1 ELSE 0 END)
    INTO instructoraCount, facilitadoraCount, staffCount
    FROM collaborators
    WHERE id_group = idGrupo AND status = 'Aprobada';

    -- Calcular cupos disponibles
    SET availableRoles = JSON_OBJECT(
        'Instructora', GREATEST(1 - COALESCE(instructoraCount, 0), 0),
        'Facilitadora', GREATEST(2 - COALESCE(facilitadoraCount, 0), 0),
        'Staff', GREATEST(1 - COALESCE(staffCount, 0), 0)
    );

    RETURN availableRoles;
END //

DELIMITER ;




DELIMITER $$

CREATE OR REPLACE PROCEDURE gestionar_solicitud_pendiente(
    IN participante_id INT,
    IN grupo_alternativo_id INT -- Puede ser NULL si solo se quiere rechazar
)
BEGIN
    DECLARE grupo_preferido INT;
    DECLARE cupo_max INT;
    DECLARE ocupados INT;
    DECLARE status_grupo_preferido VARCHAR(20);
    DECLARE status_grupo_alternativo VARCHAR(20);

    main_block: BEGIN

        -- Verifica que el participante esté en estado Pendiente
        IF (SELECT status FROM participants WHERE id_participant = participante_id) != 'Pendiente' THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Solo puedes gestionar solicitudes en estado Pendiente.';  
        END IF;

        -- Obtener grupo preferido
        SELECT preferred_group INTO grupo_preferido
        FROM participants
        WHERE id_participant = participante_id;

        -- Si no hay grupo preferido, solo se puede rechazar o aceptar en alternativo
        IF grupo_preferido IS NULL THEN
            IF grupo_alternativo_id IS NULL THEN
                UPDATE participants
                SET status = 'Rechazada'
                WHERE id_participant = participante_id;

                SELECT 'Solicitud rechazada. Puede volver a aplicar a otro grupo.' AS mensaje; 
                LEAVE main_block;
            ELSE
                SET grupo_preferido = grupo_alternativo_id;
            END IF;
        END IF;

        -- Verificar estado y cupo en grupo preferido
        SELECT status, max_places, occupied_places INTO status_grupo_preferido, cupo_max, ocupados
        FROM groups
        WHERE id_group = grupo_preferido;

        IF status_grupo_preferido = 'Cancelada' THEN
            IF grupo_alternativo_id IS NULL THEN
                UPDATE participants
                SET status = 'Rechazada'
                WHERE id_participant = participante_id;

                SELECT 'Grupo preferido cancelado. Solicitud rechazada.' AS mensaje; 
                LEAVE main_block;
            END IF;
        END IF;

        IF status_grupo_preferido = 'Cancelada' OR ocupados >= cupo_max THEN
            IF grupo_alternativo_id IS NULL THEN
                UPDATE participants
                SET status = 'Rechazada'
                WHERE id_participant = participante_id;

                SELECT 'Grupo preferido cancelado o lleno. Solicitud rechazada.' AS mensaje;  
                LEAVE main_block;
            ELSE
                -- Verificar estado y cupo en grupo alternativo
                SELECT status, max_places, occupied_places INTO status_grupo_alternativo, cupo_max, ocupados
                FROM groups
                WHERE id_group = grupo_alternativo_id;

                IF status_grupo_alternativo = 'Cancelada' THEN
                    SIGNAL SQLSTATE '45000'
                    SET MESSAGE_TEXT = 'El grupo alternativo está cancelado.'; 
                END IF;

                IF ocupados >= cupo_max THEN
                    SIGNAL SQLSTATE '45000'
                    SET MESSAGE_TEXT = 'El grupo alternativo también está lleno.'; 
                END IF;

                -- Aceptar al grupo alternativo
                UPDATE participants
                SET status = 'Aprobada', id_group = grupo_alternativo_id
                WHERE id_participant = participante_id;

                SELECT 'Solicitud aceptada en grupo alternativo.' AS mensaje; 
                LEAVE main_block;
            END IF;
        ELSE
            -- Aceptar al grupo preferido
            UPDATE participants
            SET status = 'Aprobada', id_group = grupo_preferido
            WHERE id_participant = participante_id;

            SELECT 'Solicitud aceptada en grupo preferido.' AS mensaje; 
            LEAVE main_block;
        END IF;

    END main_block;

END$$

DELIMITER ;








DELIMITER $$

CREATE OR REPLACE PROCEDURE cambiar_estado_colaborador(
    IN p_id_collaborator INT,
    IN p_username VARCHAR(255),
    IN p_accion VARCHAR(10) -- 'activar' o 'desactivar'
)
BEGIN
    DECLARE v_existe INT;
    DECLARE v_status VARCHAR(255);
    DECLARE v_nuevo_status VARCHAR(255);

    -- Verificar si el colaborador existe
    SELECT COUNT(*) INTO v_existe
    FROM collaborators
    WHERE id_collaborator = p_id_collaborator;

    IF v_existe = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El colaborador no existe.';
    END IF;

    -- Obtener status actual
    SELECT status INTO v_status
    FROM collaborators
    WHERE id_collaborator = p_id_collaborator;

    -- Validaciones de cambio de estado
    IF p_accion = 'desactivar' THEN
        IF v_status != 'Aprobada' THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Solo se pueden desactivar colaboradores con estatus Aprobada.';
        END IF;
        SET v_nuevo_status = 'Cancelada';

    ELSEIF p_accion = 'activar' THEN
        IF v_status != 'Cancelada' THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Solo se pueden activar colaboradores con estatus Cancelada.';
        END IF;
        SET v_nuevo_status = 'Aprobada';

    ELSE
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Acción no válida. Debe ser "activar" o "desactivar".';
    END IF;

    -- Registrar el log (sin sede, se usa NULL)
    CALL registrar_log(
        'UPDATE',
        'collaborators',
        CONCAT('Se ', p_accion, ' al colaborador con ID ', p_id_collaborator),
        p_username,
        NULL
    );

    -- Actualizar el status
    UPDATE collaborators
    SET status = v_nuevo_status
    WHERE id_collaborator = p_id_collaborator;
END$$

DELIMITER ;



DELIMITER $$

CREATE OR REPLACE PROCEDURE cambiar_estado_participant(
    IN p_id_participant INT,
    IN p_username VARCHAR(255),
    IN p_accion VARCHAR(10) -- 'activar' o 'desactivar'
)
BEGIN
    DECLARE v_existe INT;
    DECLARE v_status VARCHAR(255);
    DECLARE v_nuevo_status VARCHAR(255);

    -- Verificar si el participante existe
    SELECT COUNT(*) INTO v_existe
    FROM participants
    WHERE id_participant = p_id_participant;

    IF v_existe = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El participante no existe.';
    END IF;

    -- Obtener status actual
    SELECT status INTO v_status
    FROM participants
    WHERE id_participant = p_id_participant;

    -- Validaciones de cambio de estado
    IF p_accion = 'desactivar' THEN
        IF v_status != 'Aprobada' THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Solo se pueden desactivar participantes con estatus Aprobada.';
        END IF;
        SET v_nuevo_status = 'Cancelada';

    ELSEIF p_accion = 'activar' THEN
        IF v_status != 'Cancelada' THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Solo se pueden activar participantes con estatus Cancelada.';
        END IF;
        SET v_nuevo_status = 'Aprobada';

    ELSE
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Acción no válida. Debe ser "activar" o "desactivar".';
    END IF;

    -- Registrar el log (sin sede, se usa NULL)
    CALL registrar_log(
        'UPDATE',
        'participants',
        CONCAT('Se ', p_accion, ' al participante con ID ', p_id_participant),
        p_username,
        NULL
    );

    -- Actualizar el status
    UPDATE participants
    SET status = v_nuevo_status
    WHERE id_participant = p_id_participant;
END$$

DELIMITER ;













/*

--------------------------------------------------------------------------------------------------------------------------------------

--JUNTAR LOS BEFORE Y AFTER
--evitar eliminar un grupo si tiene participantes
--evento para eliminar los audits logs cada mes y se ejecute cada semana





--registrar eliminaciones en la tabla de auditoria





--tres tipos de triggers: UPDATE, DELETE, ADD 
--o hacerlo una función y que se llame desde el metodo (auditlog)

--notas
--una sola función general, audits logs no se pueden modificar (estaticos), en cada trigger mandar una 
--un trigger para definir cuales van a ser los elementos de audit log e incluir en el procedimiento de actualizar y eliminar
--investigar si el trigger se hace automaticamente cuando se hace un procedimiento

--npm run release para hacer commits
--npm run merge main

--preguntar si sirve: aqui basicamente cuando se actualiza el rol de un colaborador, se pone como pendiente
--no

--se elimino before_delete_venue
--se elimino before_delete_group
--se elimino after_delete group
--se elimino after_delete_venue
--se elimino actualizar_estado_colaborador
--registrar cambio de participantes
--se elimino registrar_cambio_participante



-- 🔸 Ejemplo de uso:

-- -- DELIMITER ;
-- -- CALL registrar_sede(
-- --   -- Datos de la sede
-- --   'ITESM Monterrey',
-- --   'Monterrey, Nuevo León',
--   'Av. Eugenio Garza Sada 2501 Sur, Tecnológico, 64849 Monterrey, N.L.',
--   FROM_BASE64('U29tZUZha2VMb2dv'),      -- logo
--   FROM_BASE64('Q29udm9jYXRvcmlhRmFrZQ=='), -- convocatoria

--   -- Coordinadora General
--   'Paola', 'Martínez', 'Rodríguez',
--   'paola.martinez@tec.mx', '+52 811 234 5678',
--   'Mujer', 'paomtz', '12345',
--   FROM_BASE64('U29tZUZha2VJbWFnZQ=='), -- imagen perfil

--   -- Coordinadora Asociada (puedes poner NULL o '' si no quieres agregar una)
--   'Luisa', 'Fernández', 'Gómez',
--   'luisa.fernandez@tec.mx', '+52 811 999 0000',

--   -- Coordinadora de Informes (Staff) (puedes poner NULL o '' si no quieres agregar una)
--   'María', 'Torres', 'Luna',
--   'maria.torres@tec.mx', '+52 811 888 1111',

--   -- Coordinadora de Informes (Participantes) (puedes poner NULL o '' si no quieres agregar una)
--   'Laura', 'García', 'Díaz',
--   'laura.garcia@tec.mx', '+52 811 777 2222'
-- );

-- =====================================================
-- Cambios en la Base de Datos
-- =====================================================

-- 🔸 Se agregó una tabla llamada 'excluded_date' para poder poner todas las fechas que no se cuentan para la impartición del curso, actualizando de manera automática la fecha de finalización del evento del grupo.
-- 🔸 Se cambió el valor de los 'prefered_groups' en todas las tablas de STRINGS a INTS para facilitar la búsqueda dentro de la base de datos por medio de funciones.
-- 🔸 Se puso como valor predeterminado de 'occupied_places' en la tabla 'groups' como 0.
-- 🔸 Se agregaron las columnas de 'level' y 'language' a la tabla de colaboradores para poder definir los cambios pertinentes por medio de funciones y procedimientos.
*/
