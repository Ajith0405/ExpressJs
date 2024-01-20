const data ={
    employees: require('../model/employees.json'),
    setEmployees : function(data){ this.employees = data}
}

const getAllEmployee = (req, res)=>{
    res.json(data.employees)
}

const createNewEmployee = (req, res)=>{
    const id = data.employees?.length ? data.employees[data.employees.length -1].id + 1 : 1;  
    const newEmp ={
        'id':id,
        'firstname': req.body.firstname,
        'lastname': req.body.lastname,
    }
    if(!newEmp.firstname || !newEmp.lastname){
        return res.status(400).json({'message':"First and last names required."});
    }

    data.setEmployees([...data.employees, newEmp]);
    res.status(200).json(data.employees)
}

const updateEmployee = (req, res)=>{
    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
    if(!employee){
        return res.status(400).json({'message':`Employee ID ${req.body.id} not found`})
    }
    if(req.body.firstname) employee.firstname = req.body.firstname;
    if(req.body.lastname) employee.lastname = req.body.lastname;
    // remove old data
    const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));
    const unsortedArray = [...filteredArray, employee];
    const sortedArray = unsortedArray.sort((a,b)=> a.id > b.id ? 1 : a.id < b.id ? -1 : 0);
    data.setEmployees(sortedArray);
    res.json(data.employees);
}

const deleteEmployee = (req, res)=>{
    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
    if(!employee){
        return res.status(400).json({'message':`Employee ID ${req.body.id} not found`})
    }
    const filteredArray = data.employees.filter(emp=> emp.id !== parseInt(req.body.id));
    data.setEmployees([...filteredArray]);
    res.json(data.employees);
}

const getEmployee = (req, res)=>{
    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
    if(!employee){
        return res.status(400).json({'message':`Employee ID ${req.body.id} not found`})
    }
    res.json(employee);
}


module.exports ={ createNewEmployee, getAllEmployee, updateEmployee, deleteEmployee, getEmployee};