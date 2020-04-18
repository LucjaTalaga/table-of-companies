import getDataFromAPI from "../../api/GetDataFromAPI";


const getCompaniesIncome = async (companies) => {
    let companiesUpdate = companies;
    let urls = [];
    companies.forEach( company=> {
        urls.push(`incomes/${company.id}`);
    });
    let requests = urls.map(url => getDataFromAPI(url));
    await Promise.all(requests)
        .then(incomes => incomes.forEach(
            (income, index) => {
                companiesUpdate[index].total_income = countTotalIncome(income.incomes);
                companiesUpdate[index].average_income = countAverageIncome(income.incomes);
                companiesUpdate[index].last_month_income = countLastMonthIncome(income.incomes);
            }
        ));
    return companiesUpdate;
};

const countTotalIncome = (incomes) => {
    let totalIncome = 0;
    for (let i = 0; i < incomes.length ; i++){
        totalIncome += parseFloat(incomes[i].value);
    }
    return parseFloat(totalIncome.toFixed(2));
};

const countAverageIncome = (incomes) => {
    return parseFloat((countTotalIncome(incomes)/incomes.length).toFixed(2));
};

const countLastMonthIncome = (incomes) => {
    let lastMonthIncomes = [...incomes];
    let recentData = 0;
    lastMonthIncomes.forEach( income => {
        let yearAndMonth = Number(income.date.substr(0,7).replace("-", ""));
        if(yearAndMonth > recentData){
            recentData = yearAndMonth;
        }
    });
    lastMonthIncomes = lastMonthIncomes.filter( income => {
        return recentData === Number(income.date.substr(0,7).replace("-", ""));
    });
    return countTotalIncome(lastMonthIncomes);
};

export default getCompaniesIncome;