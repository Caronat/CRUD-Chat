const dateFormater = (date) => {
  let days = Math.floor((new Date() - new Date(date)) / 1000 / 3600 / 24);

  switch (days) {
    case 0:
      return "aujourd'hui";
    case 1:
      return "il y a 1 jour";
    default:
      return `il y a ${days} jours`;
  }
};

export default dateFormater;
