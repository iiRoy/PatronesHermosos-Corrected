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