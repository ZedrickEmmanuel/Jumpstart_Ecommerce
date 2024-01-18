import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'God Admin',
        email: 'admin@jumpstart.com',
        password: bcrypt.hashSync('admin', 10),
        isAdmin: true
    },
    {
        name: 'Zedrick Emmanuel Zafra',
        email: 'Zedrickemmanuelzafra@gmail.com',
        password: bcrypt.hashSync('chenee2003', 10),
    },
    {
        name: 'Jump Start Demo',
        email: 'demo@jumpstart.com',    
        password: bcrypt.hashSync('demo', 10),
    },
]

export default users;