function calendar(new_year, new_month){
    var  d = new Date(new_year, new_month-1, 1),
        d_length = 32 - new Date(new_year, new_month-1, 32).getDate(),
        year = d.getFullYear(),
        month = d.getMonth(),
        date = d.getDate(),
        day = d.getDay();
}