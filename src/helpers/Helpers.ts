import { date } from 'quasar';

// funcion para recibir un array de especialidades y devolver un string con las especialidades separadas por coma y no colocar la ultima coma

export interface Specialty {
  _id: string;
  name: string;
  categoryApp: string;
}

const transformSpecialties = (specialties: Specialty[]) => {
  let specialtiesString = '';
  specialties.forEach((specialty, index) => {
    if (index === specialties.length - 1) {
      specialtiesString += specialty.name;
    } else {
      specialtiesString += `${specialty.name}, `;
    }
  });
  return specialtiesString;
};

const formatDate = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

// funcion para recibir un array de numeros que serian Lunes: 1, Martes: 2, Miercoles: 3, Jueves: 4, Viernes: 5, Sabado: 6, Domingo: 7
// si recibo [1] devolveria Lunes
// si recibo [1, 2] devolveria Lunes y Martes
// si recibo [5] devolveria Viernes
// si recibo [1, 2, 3] devolveria Lunes a Miercoles
// si recibo [1, 2, 3, 4] devolveria Lunes a Jueves
// si recibo [1, 2, 3, 4, 5] devolveria Lunes a Viernes
// si recibo [1, 2, 3, 4, 5, 6] devolveria Lunes a Sabado
// si recibo [1, 2, 3, 4, 5, 6, 7] devolveria Lunes a Domingo
// si recibo [1, 3, 5] devolveria Lunes, Miercoles y Viernes
// si recibo [1, 3, 5, 7] devolveria Lunes, Miercoles, Viernes y Domingo
const transformDays = (days: number[]) => {
  console.log(days);
  const daysWeek = [
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo',
  ];

  // Sort and remove duplicates
  days = [...new Set(days)].sort((a, b) => a - b);

  let daysString = '';
  let startRange = null;

  days.forEach((day, index) => {
    if (startRange === null) {
      startRange = day;
    }

    if (index === days.length - 1 || days[index + 1] !== day + 1) {
      if (startRange !== day) {
        daysString += `${daysWeek[startRange - 1]} a ${daysWeek[day - 1]}, `;
      } else {
        daysString += `${daysWeek[day - 1]}, `;
      }
      startRange = null;
    }
  });

  daysString = daysString.replace(/, $/, ''); // Remove trailing comma and space
  daysString = daysString.replace(/, (?=[^,]*$)/, ' y '); // Replace last comma with 'y'

  return daysString;
};


/* Funcion para recibir un Time en formato de 24 Horas y convertirlo a formato de 12 horas retornando AM o PM segun corresponda */
const convertTime = (time: string) => {
  /* const timeArray = time.split(':');
  let hours = parseInt(timeArray[0]);
  let minutes = parseInt(timeArray[1]);
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  // si minutos es menor a 10, agregar un 0 antes de los minutos
  minutes = minutes < 10 ? 0 + minutes : minutes;
  // si es un solo digito, agregar un 0 antes de la hora
  hours = hours < 10 ? 0 + hours : hours;
  const strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime; */
  console.log(time);
  const newTime = new Date(`2020-01-01T${time}`);
  const formattedTime = date.formatDate(newTime, 'h:mm a');
  return formattedTime;
};

// funcion que recibe un array de servicios y devuelve un string con los servicios separados por "-" y no colocar el ultimo "-" para colocar un "y" en su lugar
const transformServices = (services: string[]) => {
  let servicesString = '';
  services.forEach((service, index) => {
    if (index === services.length - 1) {
      servicesString += `${service}`;
    } else if (index === services.length - 2) {
      servicesString += `${service} y `;
    } else {
      servicesString += `${service} - `;
    }
  });
  return servicesString;
};

export {
  transformSpecialties,
  formatDate,
  transformDays,
  convertTime,
  transformServices,
};
