import React, { use, useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'


const UpdateProfileDialog = ( { open, setOpen}) => {

    const [loading, setLoading] = useState(false)

    const {user} = useSelector(store => store.auth);

    const dispatch = useDispatch();

    const [input, setInput] = useState({
        fullname : user?.fullname,
        email : user?.email,
        phoneNumber : user?.phoneNumber,
        bio : user?.profile?.bio,
        skills : user?.profile?.skills?.join(", "),
        file : user?.profile?.resume
    });

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
            file
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
        if(input.file) formData.append("file", input.file);

        try{
            const res = await axios.post(`${USER_API_END_POINT}/updateProfile`, 
                formData, 
                {
                withCredentials: true   
        });
            if(res.data.success){
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
            console.log(res.data.user);
        }catch(err){
            console.log(err);
            toast.error(err.response.data.message);
        } 
        setOpen(false);
        
        
    }


  return (
    <div>
        <Dialog open={open}>
            <DialogContent className="sm:max-w-[425px]" onInteraction={() => setOpen(false)}>
                <DialogHeader>
                    <DialogTitle>Update Profile</DialogTitle>
                </DialogHeader>
                <form onSubmit={submitHandler}>
                    <div className='grid gap-4 py-4'>
                        <div className='grid grid-cols-4 items-center gap-4 '>
                            <Label htmlFor="name" className="text-right">Name</Label>
                            <Input id="name" name="fullname" type="text" value={input.fullname} onChange={changeEventHandler} placeholder="Name" className="col-span-3" />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4 '>
                            <Label htmlFor="email" className="text-right">Email</Label>
                            <Input id="email" name="email" type="email" value={input.email} onChange={changeEventHandler} placeholder="email" className="col-span-3" />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4 '>
                            <Label htmlFor="number" className="text-right">Number</Label>
                            <Input id="number" name="phoneNumber" type="number" value={input.phoneNumber} onChange={changeEventHandler} placeholder="number" className="col-span-3" />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4 '>
                            <Label htmlFor="bio" className="text-right">Bio</Label>
                            <Input id="bio" name="bio" type="text" value={input.bio} onChange={changeEventHandler} placeholder="bio" className="col-span-3" />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4 '>
                            <Label htmlFor="skills" className="text-right">Skills</Label>
                            <Input id="skills" name="skills" value={input.skills} onChange={changeEventHandler} placeholder="skills" className="col-span-3" />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4 '>
                            <Label htmlFor="file" className="text-right">Resume</Label>
                            <Input id="file" name="file" onChange={changeFileHandler}  type="file" accept="application/pdf" placeholder="resume" className="col-span-3" />
                        </div>
                    </div>
                    <DialogFooter >
                        {
                            loading ? <Button className="w-full my-4"> <Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please wait </Button> : <Button type="submit" className="w-full my-4">Update </Button>
                        }
                    </DialogFooter>
                </form>
            </DialogContent >
        </Dialog>
    </div>
  )
}

export default UpdateProfileDialog