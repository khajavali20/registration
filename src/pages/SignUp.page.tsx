import { Availability } from "./components/DefaultAvailability.types";
import { GPS } from "./components/Gps.types";
import { NavBar } from "./components/NavBar";
import { Address } from "./components/address.types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";

interface IHospital {
  _id: string;
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
  hospitalServices: Array<string>;
}

export default function SignUpPage() {
  const SignUpForm = useForm<IHospital>();

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
    <div className="flex justify-center items-center min-h-screen">
      <div className="card card-bordered card-normal shadow-md bg-white">
        <div>{<NavBar />}</div>
        <div className="card-body">
          <h1 className="card-title">RegistrationForm</h1>
          <div className="divider mt-0" />
          <form>
          <div className="container">
            <div className="form-control">
              <div className="join">
                <input
                  type="text"
                  className="input input-bordered join-item"
                  {...loginForm.register("userId", { required: true })}
                  placeholder="Enter your mobile number"
                  id="userId"
                />
              </div>
              {loginForm.formState.errors.userId?.type === "required" && (
                <small className="text-error">Mobile number is required</small>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
function useForm() {
  throw new Error("Function not implemented.");
}

