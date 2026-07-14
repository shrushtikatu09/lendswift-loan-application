import { useFormContext } from "react-hook-form";

import Input from "../components/common/Input";
import Select from "../components/common/Select";

import {
  EMPLOYMENT_TYPES,
  BUSINESS_TYPES,
} from "../data/employmentOptions";


function Step5Employment() {

  const {
    register,
    watch,
    formState:{
      errors,
    },
  } = useFormContext();


  const employmentType = watch("employmentType");


  return (
    <div>

      <h2 className="text-2xl font-semibold mb-6">
        Step 5 - Employment Details
      </h2>


      <Select
        label="Employment Type"
        id="employmentType"
        name="employmentType"
        register={register}
        options={EMPLOYMENT_TYPES}
        error={errors.employmentType?.message}
      />


      {
        employmentType === "salaried" && (
          <>

          <Input
            label="Company Name"
            {...register("companyName")}
            error={errors.companyName?.message}
          />


          <Input
            label="Designation"
            {...register("designation")}
            error={errors.designation?.message}
          />


          <Input
            label="Monthly Salary"
            type="number"
            {...register(
              "monthlyIncome",
              {
                valueAsNumber:true
              }
            )}
            error={errors.monthlyIncome?.message}
          />


          <Input
            label="Years of Experience"
            type="number"
            {...register(
              "workExperience",
              {
                valueAsNumber:true
              }
            )}
            error={errors.workExperience?.message}
          />

          </>
        )
      }



      {
        employmentType === "self-employed" && (
          <>

          <Input
            label="Business Name"
            {...register("businessName")}
            error={errors.businessName?.message}
          />


          <Select
            label="Business Type"
            name="businessType"
            register={register}
            options={BUSINESS_TYPES}
            error={errors.businessType?.message}
          />


          <Input
            label="Annual Turnover"
            type="number"
            {...register(
              "annualTurnover",
              {
                valueAsNumber:true
              }
            )}
            error={errors.annualTurnover?.message}
          />


          <Input
            label="Years In Business"
            type="number"
            {...register(
              "yearsInBusiness",
              {
                valueAsNumber:true
              }
            )}
            error={errors.yearsInBusiness?.message}
          />


          <Input
            label="Monthly Income"
            type="number"
            {...register(
              "selfMonthlyIncome",
              {
                valueAsNumber:true
              }
            )}
            error={errors.selfMonthlyIncome?.message}
          />


          <Input
            label="Office Address"
            {...register("officeAddress")}
            error={errors.officeAddress?.message}
          />

          </>
        )
      }



      {
        employmentType === "business" && (
          <>

          <Input
            label="Business Name"
            {...register("businessName")}
            error={errors.businessName?.message}
          />


          <Select
            label="Business Type"
            name="businessType"
            register={register}
            options={BUSINESS_TYPES}
            error={errors.businessType?.message}
          />


          <Input
            label="Annual Turnover"
            type="number"
            {...register(
              "annualTurnover",
              {
                valueAsNumber:true
              }
            )}
            error={errors.annualTurnover?.message}
          />


          <Input
            label="Years In Business"
            type="number"
            {...register(
              "yearsInBusiness",
              {
                valueAsNumber:true
              }
            )}
            error={errors.yearsInBusiness?.message}
          />


          <Input
            label="GST Number"
            {...register("gstNumber")}
            error={errors.gstNumber?.message}
          />


          <Input
            label="Office Address"
            {...register("officeAddress")}
            error={errors.officeAddress?.message}
          />

          </>
        )
      }


    </div>
  );
}


export default Step5Employment;