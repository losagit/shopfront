import axios from 'axios';

const API_URL = `https://https://shopback01.vercel.app/`;
//const API_URL = `http://localhost:3030/`;

class AuthService {
  async login(user) {
    return axios.post(API_URL + 'api/usuarios/login', {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data));
          console.log(response.data);
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL + 'api/usuarios/register', {
      nombre: user.nombre,
      username: user.username,
      password: user.password,
      password_repeat: user.password,
      tipo_doc: user.tipo_doc,
      num_doc: user.num_doc,
      telefono: user.telefono,
      estado: user.estado,
      sede:user.sede,
      id_rol:user.id_rol,
      id_empresa: user.id_empresa
    });
  }
}

export default new AuthService();