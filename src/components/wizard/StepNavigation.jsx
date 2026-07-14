import { useFormContext } from "react-hook-form";
import { TOTAL_STEPS } from "../../config/formConfig";


const STEP_FIELDS = {

1:[
"loanType",
"loanAmount",
"loanTenure",
"loanPurpose",
],


2:[
"fullName",
"email",
"mobile",
"dateOfBirth",
"gender",
"maritalStatus",
],


3:[
"panNumber",
"aadhaarNumber",
"consent",
],


4:[
"addressLine1",
"city",
"state",
"pinCode",
"addressType",
],


6:[
"hasCoApplicant",
"coApplicantName",
"relationship",
"coApplicantMobile",
"coApplicantIncome",
],


7:[
"panCard",
"aadhaarCard",
"salarySlip",
"bankStatement",
],


};


function StepNavigation({
currentStep,
setCurrentStep
}){


const {
trigger,
watch,
setFocus
}=useFormContext();



const handleNext=async()=>{


let fields=STEP_FIELDS[currentStep] || [];


if(currentStep===5){

const employmentType=watch(
"employmentType"
);


if(employmentType==="salaried"){

fields=[
"employmentType",
"companyName",
"designation",
"monthlyIncome",
"workExperience",
];

}


else if(employmentType==="self-employed"){

fields=[
"employmentType",
"businessName",
"businessType",
"annualTurnover",
"yearsInBusiness",
"selfMonthlyIncome",
"officeAddress",
];

}


else if(employmentType==="business"){

fields=[
"employmentType",
"businessName",
"businessType",
"annualTurnover",
"yearsInBusiness",
"gstNumber",
"officeAddress",
];

}


else{

fields=[
"employmentType"
];

}

}



const valid=await trigger(fields);


if(!valid){

setFocus(fields[0]);

return;

}



if(currentStep<TOTAL_STEPS){

setCurrentStep(
prev=>prev+1
);

}

};



return (

<div className="flex justify-between mt-6">


<button
type="button"
onClick={()=>
setCurrentStep(
prev=>prev-1
)
}
disabled={currentStep===1}
>
Previous
</button>



<button
type="button"
onClick={handleNext}
>
{
currentStep===TOTAL_STEPS
?
"Submit"
:
"Next"
}
</button>


</div>

);

}


export default StepNavigation;