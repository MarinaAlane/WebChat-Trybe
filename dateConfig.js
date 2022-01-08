const data = new Date();

const dia = data.getDate();
const mes = data.getMonth() + 1;
const ano = data.getFullYear();
const hora = data.getHours();
const min = data.getMinutes();

const amOrPm = hora >= 12 ? 'PM' : 'AM';
const formatDate = `${dia}-${mes}-${ano} ${hora}:${min} ${amOrPm}`;

module.exports = {
    formatDate,
};