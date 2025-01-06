import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

        const today = dayjs();

        //15a.
        const fiveDaysAfterToday = today.add(5, 'days');
        console.log(fiveDaysAfterToday.format('MMMM D'));

        //15b.
        const monthAfterToday = today.add(1, 'months');
        console.log(monthAfterToday.format('MMMM D'));

        //15c.
        const monthBeforeToday= today.subtract(1, 'months');
        console.log(monthBeforeToday.format('MMMM D'));

        //15d.
        console.log(today.format('dddd'));

        //15e.
        function isWeekend(date){
            const day = date.format('dddd');
            if (day === 'Saturday' || day === 'Sunday'){
                return true
            } else {
                return false
            }
        }
        console.log(isWeekend(today.add(1,'days')));
        console.log(isWeekend(today));

