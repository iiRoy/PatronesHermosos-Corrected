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
CREATE TRIGGER actualizar_cupo
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
CREATE TRIGGER actualizar_estado_sede
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

-- 🔹 Devuelve en JSON el total de participantes 'Aprobadas' y 'Pendientes' según el tipo de usuario.
-- 🔸 Definición:

DELIMITER $$
CREATE FUNCTION fun_total_part(
    email_coordinadora VARCHAR(255),
    tipo_usuario ENUM('superuser', 'venue_coordinator')
)
RETURNS JSON
DETERMINISTIC
BEGIN
    DECLARE v_id INT;
    DECLARE total_aceptadas INT DEFAULT 0;
    DECLARE total_pendientes INT DEFAULT 0;

    IF tipo_usuario = 'venue_coordinator' THEN
        SELECT id_venue INTO v_id
        FROM venue_coordinators
        WHERE email COLLATE utf8mb4_general_ci = email_coordinadora COLLATE utf8mb4_general_ci;

        SELECT COUNT(*) INTO total_aceptadas
        FROM participants p
        JOIN groups g ON p.id_group = g.id_group
        WHERE g.id_venue = v_id AND p.status = 'Aprobada';

        SELECT COUNT(*) INTO total_pendientes
        FROM participants p
        LEFT JOIN groups g ON p.id_group = g.id_group
        LEFT JOIN groups pg ON p.preferred_group = pg.id_group
        WHERE p.status = 'Pendiente'
        AND (
            (g.id_group IS NOT NULL AND g.id_venue = v_id)
            OR (g.id_group IS NULL AND pg.id_venue = v_id)
        );

    ELSE
        SELECT COUNT(*) INTO total_aceptadas FROM participants WHERE status = 'Aprobada';
        SELECT COUNT(*) INTO total_pendientes FROM participants WHERE status = 'Pendiente';
    END IF;

    RETURN JSON_OBJECT('Aprobadas', total_aceptadas, 'Pendientes', total_pendientes);
END;
$$

-- 🔸 Ejemplo de uso:

-- DELIMITER ;
-- SELECT fun_total_part('corta@tec.mx', 'venue_coordinator');

-- 🔹 Devuelve en JSON el total de colaboradores 'Aprobadas' y 'Pendientes' según el tipo de usuario.
-- 🔸 Definición:

DELIMITER $$
CREATE FUNCTION fun_total_colab(
    email_coordinadora VARCHAR(255),
    tipo_usuario ENUM('superuser', 'venue_coordinator')
)
RETURNS JSON
DETERMINISTIC
BEGIN
    DECLARE v_id INT;
    DECLARE total_aceptadas INT DEFAULT 0;
    DECLARE total_pendientes INT DEFAULT 0;

    IF tipo_usuario = 'venue_coordinator' THEN
        SELECT id_venue INTO v_id
        FROM venue_coordinators
        WHERE email COLLATE utf8mb4_general_ci = email_coordinadora COLLATE utf8mb4_general_ci;

        SELECT COUNT(*) INTO total_aceptadas
        FROM collaborators c
        JOIN groups g ON c.id_group = g.id_group
        WHERE g.id_venue = v_id AND c.status = 'Aprobada';

        SELECT COUNT(*) INTO total_pendientes
        FROM collaborators c
        LEFT JOIN groups g ON c.id_group = g.id_group
        LEFT JOIN groups pg ON c.preferred_group = pg.id_group
        WHERE c.status = 'Pendiente'
        AND (
            (g.id_group IS NOT NULL AND g.id_venue = v_id)
            OR (g.id_group IS NULL AND pg.id_venue = v_id)
        );
    ELSE
        SELECT COUNT(*) INTO total_aceptadas FROM collaborators WHERE status = 'Aprobada';
        SELECT COUNT(*) INTO total_pendientes FROM collaborators WHERE status = 'Pendiente';
    END IF;

    RETURN JSON_OBJECT('Aprobadas', total_aceptadas, 'Pendientes', total_pendientes);
END;
$$

-- 🔸 Ejemplo de uso:

-- DELIMITER ;
-- SELECT fun_total_colab('corta@tec.mx', 'venue_coordinator');

-- 🔹 Devuelve el total de mentoras para la sede correspondiente.
-- 🔸 Definición:

DELIMITER $$
CREATE FUNCTION fun_total_ment(
    email_coordinadora VARCHAR(255),
    tipo_usuario ENUM('superuser', 'venue_coordinator')
)
RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE v_id INT;

    IF tipo_usuario = 'venue_coordinator' THEN
        SELECT id_venue INTO v_id FROM venue_coordinators
        WHERE email COLLATE utf8mb4_general_ci = email_coordinadora COLLATE utf8mb4_general_ci;
        RETURN (SELECT COUNT(*) FROM mentors WHERE id_venue = v_id);
    ELSE
        RETURN (SELECT COUNT(*) FROM mentors);
    END IF;
END;
$$

-- 🔸 Ejemplo de uso:

-- DELIMITER ;
-- SELECT fun_total_ment('corta@tec.mx', 'venue_coordinator');

-- 🔹 Devuelve el total de coordinadoras (generales y asistentes) por sede activa.
-- 🔸 Definición:

DELIMITER $$
CREATE FUNCTION fun_total_coord(
    email_coordinadora VARCHAR(255),
    tipo_usuario ENUM('superuser', 'venue_coordinator')
)
RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE v_id INT;
    DECLARE total INT DEFAULT 0;

    IF tipo_usuario = 'venue_coordinator' THEN
        SELECT id_venue INTO v_id
        FROM venue_coordinators
        WHERE email COLLATE utf8mb4_general_ci = email_coordinadora COLLATE utf8mb4_general_ci;

        SELECT (
            SELECT COUNT(*) FROM venue_coordinators vc
            JOIN venues v ON vc.id_venue = v.id_venue
            WHERE vc.id_venue = v_id
              AND v.status IN ('Registrada con participantes', 'Registrada sin participantes')
        ) +
        (
            SELECT COUNT(*) FROM assistant_coordinators ac
            JOIN venues v ON ac.id_venue = v.id_venue
            WHERE ac.id_venue = v_id
              AND ac.role IN ('Coordinadora Asociada', 'Coordinadora de informes')
              AND v.status IN ('Registrada con participantes', 'Registrada sin participantes')
        ) INTO total;

    ELSE
        SELECT (
            SELECT COUNT(*) FROM venue_coordinators vc
            JOIN venues v ON vc.id_venue = v.id_venue
            WHERE v.status IN ('Registrada con participantes', 'Registrada sin participantes')
        ) +
        (
            SELECT COUNT(*) FROM assistant_coordinators ac
            JOIN venues v ON ac.id_venue = v.id_venue
            WHERE ac.role IN ('Coordinadora Asociada', 'Coordinadora de informes')
              AND v.status IN ('Registrada con participantes', 'Registrada sin participantes')
        ) INTO total;
    END IF;

    RETURN total;
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
CREATE PROCEDURE resumen_sede(
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

    SELECT 
        v.name AS sede,

        (SELECT COUNT(*) FROM participants p
        JOIN groups g ON p.id_group = g.id_group
        WHERE g.id_venue = v.id_venue AND p.status = 'Aprobada') AS participantes_aceptadas,

        (SELECT COUNT(*) FROM participants p
        LEFT JOIN groups g ON p.id_group = g.id_group
        LEFT JOIN groups pg ON p.preferred_group = pg.id_group
        WHERE p.status = 'Pendiente' AND (
            (p.id_group IS NOT NULL AND g.id_venue = v.id_venue)
            OR (p.id_group IS NULL AND pg.id_venue = v.id_venue)
        )) AS participantes_pendientes,

        (SELECT COUNT(*) FROM collaborators c
        JOIN groups g ON c.id_group = g.id_group
        WHERE g.id_venue = v.id_venue AND c.status = 'Aprobada') AS colaboradores_aceptados,

        (SELECT COUNT(*) FROM collaborators c
        LEFT JOIN groups g ON c.id_group = g.id_group
        LEFT JOIN groups pgc ON c.preferred_group = pgc.id_group
        WHERE c.status = 'Pendiente' AND (
            (c.id_group IS NOT NULL AND g.id_venue = v.id_venue)
            OR (c.id_group IS NULL AND pgc.id_venue = v.id_venue)
        )) AS colaboradores_pendientes

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
CREATE PROCEDURE resumen_colaboradores(
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

    SELECT 
        c.role,
        COUNT(*) AS total
    FROM collaborators c
    LEFT JOIN groups g ON c.id_group = g.id_group
    LEFT JOIN venues v ON g.id_venue = v.id_venue
    WHERE (tipo_usuario = 'superuser' OR v.id_venue = v_id)
    GROUP BY c.role
    ORDER BY c.role;
END;
$$

-- 🔸 Ejemplo de uso:

-- DELIMITER ;
-- CALL resumen_colaboradores('venue_coordinator', 'corta@tec.mx');

-- 🔹 Agrupa las coordinadoras generales, asociadas e informes por sede.
-- 🔸 Definición:

DELIMITER $$
CREATE PROCEDURE resumen_coordinadores(
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

    SELECT
        'Coordinadora General' AS role,
        COUNT(*) AS total
    FROM venue_coordinators vc
    JOIN venues v ON vc.id_venue = v.id_venue
    WHERE v.status IN ('Registrada con participantes', 'Registrada sin participantes')
      AND (tipo_usuario = 'superuser' OR v.id_venue = v_id)

    UNION ALL

    SELECT
        ac.role,
        COUNT(*) AS total
    FROM assistant_coordinators ac
    JOIN venues v ON ac.id_venue = v.id_venue
    WHERE v.status IN ('Registrada con participantes', 'Registrada sin participantes')
      AND ac.role IN ('Coordinadora Asociada', 'Coordinadora de informes')
      AND (tipo_usuario = 'superuser' OR v.id_venue = v_id)
    GROUP BY ac.role;
END;
$$

-- 🔸 Ejemplo de uso:

-- DELIMITER ;
-- CALL resumen_coordinadores('superuser', '');

-- 🔹 Llama funciones de conteo y devuelve el resumen global del evento.
-- 🔸 Definición:

DELIMITER $$
CREATE PROCEDURE resumen_evento(
    IN tipo_usuario ENUM('superuser', 'venue_coordinator'),
    IN email_coordinadora VARCHAR(255)
)
BEGIN
    SELECT
        fun_total_part(email_coordinadora, tipo_usuario) AS total_participantes,
        fun_total_colab(email_coordinadora, tipo_usuario) AS total_colaboradores,
        fun_total_ment(email_coordinadora, tipo_usuario) AS total_mentoras,
        fun_total_coord(email_coordinadora, tipo_usuario) AS total_coordinadoras;
END;
$$

-- 🔸 Ejemplo de uso:

-- DELIMITER ;
-- CALL resumen_evento('superuser', '');

-- 🔹 Muestra la capacidad usada de los grupos (porcentaje y ocupación).
-- 🔸 Definición:

DELIMITER $$
CREATE PROCEDURE capacidad_grupos(
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
CREATE FUNCTION fun_part_aceptadas(grupo_id INT)
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
CREATE FUNCTION fun_part_interesadas(grupo_id INT)
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
CREATE PROCEDURE validar_capacidad_participante(
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
CREATE PROCEDURE registrar_part(
    -- Datos del Participante
    IN nombre_part VARCHAR(255),
    IN paterno_part VARCHAR(255),
    IN materno_part VARCHAR(255),
    IN email_part VARCHAR(255),
    IN grado_part VARCHAR(255),
    IN escolaridad_part VARCHAR(255),
    IN archivo_permiso BLOB,
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
        year, education, participation_file, preferred_group, id_tutor, status
    )
    VALUES (
        nombre_part, paterno_part, materno_part, email_part,
        grado_part, escolaridad_part, archivo_permiso,
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
CREATE PROCEDURE aprobar_part(
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
CREATE PROCEDURE registrar_colab(
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
    IN id_grupo_preferido INT,
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
        preferred_group, gender
    )
    VALUES (
        nombre, paterno, materno, email, telefono,
        universidad, carrera, semestre,
        rol_preferido, idioma_preferido, nivel_preferido,
        id_grupo_preferido, genero
    );
END;
$$ 

-- 🔸 Ejemplo de uso:

-- DELIMITER ;
-- CALL registrar_colab('María', 'Perez', 'Gomez', 'maria@tec.mx', '+52 222 111 3344', 'ITESM', 'Ingeniería', '6', 'Facilitadora', 'Español', 'Básico', 1, 'Mujer');

-- 🔹 Aprueba colaborador con datos completos, según sus preferencias.
-- 🔸 Definición:

DELIMITER $$
CREATE PROCEDURE aprobar_colab(
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
CREATE PROCEDURE registrar_grupo(
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
CREATE PROCEDURE registrar_sede(
    -- Datos sede
    IN nombre_sede VARCHAR(255),
    IN ubicacion_sede VARCHAR(255),
    IN direccion_sede VARCHAR(255),
    IN logo BLOB,
    IN convocatoria BLOB,

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

    INSERT INTO venues (name, location, address, logo, participation_file, status)
    VALUES (nombre_sede, ubicacion_sede, direccion_sede, logo, convocatoria, 'Pendiente');

    SET nueva_sede_id = LAST_INSERT_ID();

    INSERT INTO venue_coordinators (
        name, paternal_name, maternal_name, email, phone_number,
        gender, username, password, profile_image, id_venue
    )
    VALUES (
        nombre_general, paterno_general, materno_general, email_general, celular_general,
        sexo_general, usuario_general, contrasena_general, imagen_perfil, nueva_sede_id
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

-- 🔸 Se agregó una tabla llamada "excluded_date" para poder poner todas las fechas que no se cuentan para la impartición del curso, actualizando de manera automática la fecha de finalización del evento del grupo.
-- 🔸 Se cambió el valor de los "prefered_groups" en todas las tablas de STRINGS a INTS para facilitar la búsqueda dentro de la base de datos por medio de funciones.
-- 🔸 Se puso como valor predeterminado de "occupied_places" en la tabla "groups" como 0.
-- 🔸 Se agregaron las columnas de "level" y "language" a la tabla de colaboradores para poder definir los cambios pertinentes por medio de funciones y procedimientos.