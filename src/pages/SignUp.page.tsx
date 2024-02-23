import { Availability } from "./components/DefaultAvailability.types";
import { GPS } from "./components/Gps.types";
import { NavBar } from "./components/NavBar";
import { Address } from "./components/address.types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";

interface IHospital {
  // _id: string;
  fullName: string;
  centerName: string;
  helplineNumber: string;
  mobileNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  address: Address;
  gps: GPS;
  profilePicture: string;
  centerImages: Array<string>;
  proofs: Array<string>;
  description: string;
  defaultAvailability: Availability;
  hospitalServices: string[];
}

export default function SignUpPage() {
  const registerForm = useForm<IHospital>({
    defaultValues: {
      fullName: "",
      centerName: "",
      helplineNumber: "",
      mobileNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
      address: {
        line1: "",
        line2: "",
        village: "",
        city: "",
        state: "",
        pinCode: "",
      },
      gps: {
        type: "",
        coordinates: [],
      },
      profilePicture: "",
      centerImages: [""],
      proofs: [""],
      description: "",
      defaultAvailability: {
        open: [""],
        close: [""],
        price: [],
        appointments: [],
      },
      hospitalServices: [""],
    },
  });

  const signUp = useMutation({
    mutationKey: ["register"],
    mutationFn: async (data: IHospital) => {
      try {
        const response = await axios.postForm("/hospitals/register", data);
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(error.response?.data?.message || "An error occurred");
        }
      }
    },
  });

  return (
    <div className="flex justify-center items-center pt-28">
      <div className="card card-bordered card-normal shadow-md bg-white">
        <div>{<NavBar />}</div>
        <div className="card-head px-10">
          <h1 className="card-title pt-3">RegistrationForm</h1>
          <div className="divider mt-0" />
          <form
            className="grid grid-cols-2"
            onSubmit={registerForm.handleSubmit((e) => signUp.mutate(e))}
          >
            <div className="container">
              <div className="form-control">
                <input
                  type="text"
                  className={`input input-bordered w-full ${
                    registerForm.formState.errors.fullName ? "input-error" : ""
                  }`}
                  {...registerForm.register("fullName", { required: true })}
                  placeholder="Enter your full name"
                  id="name"
                />
                {registerForm.formState.errors.fullName?.type ===
                  "required" && (
                  <small className="text-error"> FullName is required</small>
                )}
              </div>
              <div className="form-control">
                <input
                  type="text"
                  className={`input input-bordered w-full ${
                    registerForm.formState.errors.centerName
                      ? "input-error"
                      : ""
                  }`}
                  {...registerForm.register("centerName", { required: true })}
                  placeholder="Center name"
                  id="cname"
                />
                {registerForm.formState.errors.centerName?.type ===
                  "required" && (
                  <small className="text-error"> Center name is required</small>
                )}
              </div>
              <div className="form-control">
                <input
                  type="number"
                  className={`input input-bordered w-full ${
                    registerForm.formState.errors.helplineNumber
                      ? "input-error"
                      : ""
                  }`}
                  {...registerForm.register("helplineNumber", {
                    required: true,
                  })}
                  placeholder="Enter Helpline number"
                  id="helplineNumber"
                />
                {registerForm.formState.errors.helplineNumber?.type ===
                  "required" && (
                  <small className="text-error">
                    helplineNumber is required
                  </small>
                )}
              </div>
              <div className="form-control">
                <input
                  type="number"
                  className={`input input-bordered w-full px-10 ${
                    registerForm.formState.errors.mobileNumber
                      ? "input-error"
                      : ""
                  }`}
                  {...registerForm.register("mobileNumber", { required: true })}
                  placeholder="Enter mobile number"
                  id="mobileNumber"
                />
                {registerForm.formState.errors.mobileNumber?.type ===
                  "required" && (
                  <small className="text-error">
                    {" "}
                    Phone number is required
                  </small>
                )}
              </div>
              <div className="form-control">
                <input
                  type="text"
                  className={`input input-bordered w-full px-10 ${
                    registerForm.formState.errors.fullName ? "input-error" : ""
                  }`}
                  {...registerForm.register("fullName", { required: true })}
                  placeholder="Enter your full name"
                  id="name"
                />
                {registerForm.formState.errors.fullName?.type ===
                  "required" && (
                  <small className="text-error"> FullName is required</small>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
