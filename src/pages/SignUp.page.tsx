import { useState } from "react";
import { Availability } from "./components/DefaultAvailability.types";
// import { GPS } from "./components/Gps.types";
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
  gps: [number, number];
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
      gps: [],
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

  const [isSubmitted, setIsSubmitted] = useState(false);

  // const location = useFieldArray({
  //   control: registerForm.control,
  //   name: gps[]
  // });

  const [items, setItem] = useState(false);
  const [selectItem, setSelectItem] = useState<string[]>([]);
  const [error, setError] = useState("");
  const options = [
    "Ent",
    "General Physician",
    "Pediatrician",
    "Radiology",
    "Ophthalmology",
    "Orthopedics",
    "Gynecology",
    "Cardiology",
    "Emergency",
    "Dental",
    "Neurology",
    "Psychiatrist",
    "Dermatology",
    "Pulmnologist",
    "Urologist",
    "General Surgeon",
    "Phsiotheraphy",
    "Plastic Surgeon",
    "Optometrist",
    "Gastroenterology",
    "Other",
  ];

  const dropdown = () => {
    setItem(!items);
  };

  const selectingItem = (item: string) => {
    if (selectItem.includes(item)) {
      setSelectItem(selectItem.filter((selected) => selected !== item));
    } else {
      setSelectItem([...selectItem, item]);
    }
  };

  const handleSubmit = () => {
    if (selectItem.length === 0) {
      setError("Please select at least one service.");
    }
  };

  const signUp = useMutation({
    mutationKey: ["register"],
    mutationFn: async (data: IHospital) => {
      try {
        const response = await axios.postForm("/hospitals/register", data);
        setIsSubmitted(true);

        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(error.response?.data?.message || "An error occurred");
        }
      }
    },
  });

  if (isSubmitted) {
    return <p>Registration is submitted successfully!</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-y-4 pt-28">
      <div className="card card-bordered card-normal shadow-md bg-white mx-[35%] gap-y-3">
        <div>{<NavBar />}</div>
        <form
          className="card-body"
          onSubmit={registerForm.handleSubmit((e) => signUp.mutate(e))}
        >
          <h1 className="card-title">HOSPITAL REGISTRATION</h1>
          <div className="container">
            {/* FullName */}
            <div className="form-control">
              <input
                type="text"
                className={`input input-bordered w-full placeholder-white ${
                  registerForm.formState.errors.fullName ? "input-error" : ""
                }`}
                {...registerForm.register("fullName", { required: true })}
                placeholder="Enter your full name"
                id="name"
              />
              {registerForm.formState.errors.fullName?.type === "required" && (
                <small className="text-error"> FullName is required</small>
              )}
            </div>
            {/* Center Name */}
            <div className="form-control mt-3">
              <input
                type="text"
                className={`input input-bordered w-full placeholder-white ${
                  registerForm.formState.errors.centerName ? "input-error" : ""
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
            {/* Helpline Number */}
            <div className="form-control mt-3">
              <input
                type="tel"
                className={`input input-bordered w-full placeholder-white ${
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
                <small className="text-error">helplineNumber is required</small>
              )}
            </div>
            {/* Mobile Number */}
            <div className="form-control mt-3">
              <input
                type="tel"
                className={`input input-bordered w-full placeholder-white ${
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
                <small className="text-error">Phone number is required</small>
              )}
            </div>
            {/* Email */}
            <div className="form-control mt-3">
              <input
                type="text"
                className={`input input-bordered w-full placeholder-white ${
                  registerForm.formState.errors.email ? "input-error" : ""
                }`}
                {...registerForm.register("email", { required: false })}
                placeholder="Enter Email"
                id="email"
              />
            </div>
            {/* Password */}
            <div className="form-control mt-3">
              <input
                type="password"
                className={`input input-bordered w-full placeholder-white ${
                  registerForm.formState.errors.password ? " input-error" : ""
                }`}
                {...registerForm.register("password", { required: true })}
                id="password"
                placeholder="Enter Password"
              />
              {registerForm.formState.errors.password?.type === "required" && (
                <small className="text-error">Password is required</small>
              )}
            </div>
            <div className="form-control mt-3">
              {/* Confirm Password */}
              <input
                type="password"
                className={`input input-bordered w-full placeholder-white  ${
                  registerForm.formState.errors.confirmPassword
                    ? "input-error"
                    : ""
                }`}
                {...registerForm.register("confirmPassword", {
                  required: true,
                })}
                placeholder="Confirm Password"
                id="confirmPassword"
              />
              {registerForm.formState.errors.confirmPassword?.type ===
                "required" && (
                <small className="text-error">
                  Confirm Password is required
                </small>
              )}
            </div>

            <div className="form-control mt-3">
              {/* Address Line 1 */}
              <input
                type="text"
                className={`input input-bordered w-full placeholder-white  ${
                  registerForm.formState.errors.address?.line1
                    ? "input-error"
                    : ""
                }`}
                {...registerForm.register("address.line1", {
                  required: true,
                })}
                placeholder="Address Line 1"
              />
              {registerForm.formState.errors.address?.line1?.type ===
                "required" && (
                <small className="text-error">Address Line 1 is required</small>
              )}
            </div>

            <div className="form-control mt-3">
              {/* Address Line 2 */}
              <input
                type="text"
                className={`input input-bordered w-full placeholder-white  ${
                  registerForm.formState.errors.address?.line2
                    ? "input-error"
                    : ""
                }`}
                {...registerForm.register("address.line2", {
                  required: false,
                })}
                placeholder="Address Line 2"
                id="line2"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="form-control mt-3">
                {/* Address Village */}
                <input
                  type="text"
                  className={`input input-bordered w-full placeholder-white  ${
                    registerForm.formState.errors.address?.village
                      ? "input-error"
                      : ""
                  }`}
                  {...registerForm.register("address.village", {
                    required: true,
                  })}
                  placeholder="Village"
                  id="village"
                />
                {registerForm.formState.errors.address?.village?.type ===
                  "required" && (
                  <small className="text-error">Village is required</small>
                )}
              </div>

              <div className="form-control mt-3">
                {/* Address city */}
                <input
                  type="text"
                  className={`input input-bordered w-full placeholder-white  ${
                    registerForm.formState.errors.address?.city
                      ? "input-error"
                      : ""
                  }`}
                  {...registerForm.register("address.city", {
                    required: true,
                  })}
                  placeholder="City"
                  id="city"
                />
                {registerForm.formState.errors.address?.city?.type ===
                  "required" && (
                  <small className="text-error">city is required</small>
                )}
              </div>

              <div className="form-control mt-3">
                {/* Address State */}
                <input
                  type="text"
                  className={`input input-bordered w-full placeholder-white  ${
                    registerForm.formState.errors.address?.state
                      ? "input-error"
                      : ""
                  }`}
                  {...registerForm.register("address.state", {
                    required: true,
                  })}
                  placeholder="State"
                  id="state"
                />
                {registerForm.formState.errors.address?.state?.type ===
                  "required" && (
                  <small className="text-error">State is required</small>
                )}
              </div>

              <div className="form-control mt-3">
                {/* Address PinCode */}
                <input
                  type="text"
                  className={`input input-bordered w-full placeholder-white  ${
                    registerForm.formState.errors.address?.pinCode
                      ? "input-error"
                      : ""
                  }`}
                  {...registerForm.register("address.pinCode", {
                    required: true,
                  })}
                  placeholder="PinCode"
                  id="pinCode"
                />
                {registerForm.formState.errors.address?.pinCode?.type ===
                  "required" && (
                  <small className="text-error">Pin code is required</small>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="form-control mt-3">
                {/* GPS Type */}
                <input
                  type="number"
                  className={`input input-bordered w-full placeholder-white  remove-arrow  ${
                    registerForm.formState.errors.gps?.[0]?.type
                      ? "input-error"
                      : ""
                  }`}
                  {...registerForm.register(`gps.0`, {
                    required: "Longitude value is required",
                    min: {
                      value: -180,
                      message:
                        "Longitude value should not be less than -180 deg",
                    },
                    max: {
                      value: 180,
                      message:
                        "Longitude value should not be grater than 180 deg",
                    },
                  })}
                  placeholder={`Longitude`}
                  min={-180}
                  max={180}
                />
                {registerForm.formState.errors.gps?.[0]?.type ===
                  "required" && (
                  <small className="text-error">
                    GPS Longitude is required
                  </small>
                )}
              </div>
              <div className="form-control mt-3">
                <input
                  type="number"
                  className={`input input-bordered w-full placeholder-white  remove-arrow  ${
                    registerForm.formState.errors.gps?.[1]?.type
                      ? "input-error"
                      : ""
                  }`}
                  {...registerForm.register(`gps.1`, {
                    required: "Longitude value is required",
                    min: {
                      value: -90,
                      message:
                        "Latitude value should not be less than -180 deg",
                    },
                    max: {
                      value: 90,
                      message:
                        "Latitude value should not be grater than 180 deg",
                    },
                  })}
                  placeholder={`Latitude`}
                  min={-90}
                  max={90}
                />
                {registerForm.formState.errors.gps?.[1]?.type ===
                  "required" && (
                  <small className="text-error">GPS Latitude is required</small>
                )}
              </div>
            </div>
            {/* defaultAvailability Open */}
            <div className="grid grid-cols-2 gap-3 ">
              <div className="form-control mt-3">
                {/* <label htmlFor="availabilityOpen">Availability Open*</label> */}
                <input
                  type="text"
                  id="availabilityOpen"
                  placeholder="Availability Open"
                  className={`input input-bordered w-full placeholder-white ${
                    registerForm.formState.errors.defaultAvailability?.open
                      ? "input-error"
                      : ""
                  }`}
                  {...registerForm.register("defaultAvailability.open", {
                    required: "Availability Open is required",
                  })}
                />
                {registerForm.formState.errors.defaultAvailability?.open && (
                  <small className="text-error">
                    {
                      registerForm.formState.errors.defaultAvailability.open
                        .message
                    }
                  </small>
                )}
              </div>
              {/* defaultAvailability Close */}
              <div className="form-control mt-3">
                {/* <label htmlFor="availabilityClose">Availability Close*</label> */}
                <input
                  type="text"
                  id="availabilityClose"
                  placeholder="Availability close"
                  className={`input input-bordered w-full placeholder-white ${
                    registerForm.formState.errors.defaultAvailability?.close
                      ? "input-error"
                      : ""
                  }`}
                  {...registerForm.register("defaultAvailability.close", {
                    required: "Availability Close is required",
                  })}
                />
                {registerForm.formState.errors.defaultAvailability?.close && (
                  <small className="text-error">
                    {
                      registerForm.formState.errors.defaultAvailability.close
                        .message
                    }
                  </small>
                )}
              </div>

              {/* Default Availability Price */}
              <div className="form-control mt-3">
                {/* <label htmlFor="availabilityClose">Availability Close*</label> */}
                <input
                  type="text"
                  id="availabilityPrice"
                  placeholder="Availability Price"
                  className={`input input-bordered w-full placeholder-white ${
                    registerForm.formState.errors.defaultAvailability?.price
                      ? "input-error"
                      : ""
                  }`}
                  {...registerForm.register("defaultAvailability.price", {
                    required: "Availability price is required",
                  })}
                />
                {registerForm.formState.errors.defaultAvailability?.price && (
                  <small className="text-error">
                    {
                      registerForm.formState.errors.defaultAvailability.price
                        .message
                    }
                  </small>
                )}
              </div>

              {/* Default Availability Appointment */}
              <div className="form-control mt-3">
                {/* <label htmlFor="availabilityClose">Availability Close*</label> */}
                <input
                  type="text"
                  id="availabilityAppointment"
                  placeholder="Availability Appointment"
                  className={`input input-bordered w-full placeholder-white ${
                    registerForm.formState.errors.defaultAvailability
                      ?.appointments
                      ? "input-error"
                      : ""
                  }`}
                  {...registerForm.register(
                    "defaultAvailability.appointments",
                    {
                      required: "Availability appointments is required",
                    }
                  )}
                />
                {registerForm.formState.errors.defaultAvailability
                  ?.appointments && (
                  <small className="text-error">
                    {
                      registerForm.formState.errors.defaultAvailability
                        .appointments.message
                    }
                  </small>
                )}
              </div>
            </div>
            {/* hospitalServices */}
            <div className="form-control mt-3">
              <label htmlFor="services">Hospital Services*</label>
              <div className="dropdown dropdown-hover w-full">
                <div onClick={dropdown} className="btn m-1 w-full">
                  {selectItem.length
                    ? selectItem.join(", ")
                    : "Select Hospital Services"}
                </div>
                {items && (
                  <ul className="dropdown-content z-10 menu p-2 shadow bg-base-100 rounded-box w-full">
                    {options.map((option) => (
                      <li key={option}>
                        <label
                          htmlFor=""
                          className="flex items-center cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={selectItem.includes(option)}
                            onChange={() => selectingItem(option)}
                            className="form-checkbox  mr-2"
                          />
                          <span>{option}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {error && <p className="text-error">{error}</p>}
            </div>

            {/* Profile Picture */}
            <div className="form-control mt-3">
              <label htmlFor="profile">ProfilePicture*</label>
              <input
                type="file"
                id="profile"
                accept="image/*"
                className={`file-input file-input-bordered w-full placeholder-white  ${
                  registerForm.formState.errors.profilePicture
                    ? "file-input-error"
                    : ""
                }`}
                {...registerForm.register("profilePicture", {
                  required: true,
                })}
              />
              {registerForm.formState.errors.profilePicture?.type ===
                "required" && (
                <small className="text-error">
                  Profile Picture is required
                </small>
              )}
            </div>
            {/* Center Images */}
            <div className="form-control mt-3">
              <label htmlFor="centerImage">Center Images*</label>
              <input
                type="file"
                id="centerImage"
                className={`file-input file-input-bordered w-full placeholder-white  ${
                  registerForm.formState.errors.centerImages
                    ? "file-input-error"
                    : ""
                }`}
                {...registerForm.register("centerImages", {
                  required: true,
                })}
              />
              {registerForm.formState.errors.centerImages?.type ===
                "required" && (
                <small className="text-error">Center Image is required</small>
              )}
            </div>
            {/* proofs */}
            <div className="form-control mt-3">
              <label htmlFor="proofs">Proofs*</label>
              <input
                type="file"
                id="proofs"
                className={`file-input file-input-bordered w-full placeholder-white  ${
                  registerForm.formState.errors.proofs ? "file-input-error" : ""
                }`}
                {...registerForm.register("proofs", {
                  required: true,
                })}
              />
              {registerForm.formState.errors.proofs?.type === "required" && (
                <small className="text-error">Proofs is required</small>
              )}
            </div>

            {/* description */}
            <div className="form-control mt-3">
              <textarea
                className="textarea textarea-bordered placeholder-white"
                rows={3}
                placeholder="Enter description"
                id="description"
                {...registerForm.register("description", {
                  required: "Description is required",
                })}
              ></textarea>
              {registerForm.formState.errors.description && (
                <small className="text-error">
                  {registerForm.formState.errors.description?.message}
                </small>
              )}
            </div>
            <div className="card-action mt-3 text-end">
              <button
                type="submit"
                className="btn btn-secondary ml-auto w-52"
                disabled={status === "pending"}
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
