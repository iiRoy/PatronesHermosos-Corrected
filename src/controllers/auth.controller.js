const login = (req, res) => {
    const { email, password } = req.body;

    // Por ahora solo simula login exitoso
    if (email === 'admin@example.com' && password === 'admin123') {
        return res.json({
            message: 'Login exitoso',
            token: 'fake-jwt-token',
            role: 'admin',
        });
    }

    return res.status(401).json({ message: 'Credenciales inválidas' });
};

module.exports = {
    login,
};
