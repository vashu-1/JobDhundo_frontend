import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import { USER_API_END_POINT } from "@/utils/constant";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    fullname: user?.fullname,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    bio: user?.profile?.bio,
    skills: user?.profile?.skills?.map((skill) => skill),
    resume: user?.profile?.resume,
  });
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({
      ...input,
      file, // Update resume if a new file is selected
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.put(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        // Handle success
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
    setOpen(false);
    console.log(input);
  };

  return (
    <div>
      <Dialog open={open}>
        <DialogContent
          className="sm:max-w-[425px]"
          onInteractOutside={() => setOpen(false)}
        >
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
            <DialogDescription>
              Update your personal information and upload your latest resume.
            </DialogDescription>
            <form onSubmit={submitHandler}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 gap-4 items-center">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <input
                    name="fullname"
                    id="name"
                    type="text"
                    onChange={changeEventHandler}
                    value={input.fullname}
                    className="col-span-3 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div className="grid grid-cols-4 gap-4 items-center">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <input
                    name="email"
                    id="email"
                    type="email"
                    onChange={changeEventHandler}
                    value={input.email}
                    className="col-span-3 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div className="grid grid-cols-4 gap-4 items-center">
                  <Label htmlFor="number" className="text-right">
                    Number
                  </Label>
                  <input
                    name="number"
                    id="number"
                    type="number"
                    onChange={changeEventHandler}
                    value={input.phoneNumber}
                    className="col-span-3 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div className="grid grid-cols-4 gap-4 items-center">
                  <Label htmlFor="bio" className="text-right">
                    Bio
                  </Label>
                  <input
                    name="bio"
                    id="bio"
                    onChange={changeEventHandler}
                    value={input.bio}
                    className="col-span-3 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div className="grid grid-cols-4 gap-4 items-center">
                  <Label htmlFor="skills" className="text-right">
                    Skills
                  </Label>
                  <input
                    name="skills"
                    id="skills"
                    onChange={changeEventHandler}
                    value={input.skills}
                    className="col-span-3 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div className="grid grid-cols-4 gap-4 items-center">
                  <Label htmlFor="resume" className="text-right">
                    Resume
                  </Label>
                  <input
                    name="file"
                    id="file"
                    type="file"
                    onChange={changeFileHandler}
                    accept="application/pdf"
                    className="col-span-3 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              </div>
              <DialogFooter>
                {loading ? (
                  <Button className="w-full my-4">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </Button>
                ) : (
                  <Button type="submit" className="w-full my-4">
                    Update
                  </Button>
                )}
              </DialogFooter>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfileDialog;
