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