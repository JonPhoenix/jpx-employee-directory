import axios from 'axios';

// Getting all the employees
export default {
    getEmployees: function() {
        return axios.get('https://randomuser.me/api/?inc=name,email,dob,picture,phone&nat=us&results=50');
    }
};
