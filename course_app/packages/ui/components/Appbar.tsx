import {Typography} from "@mui/material";
import Button from "@mui/material/Button";
import { useRouter } from 'next/router';
import { isUserLoading } from "../../store/selectors/isUserLoading";
import {useSetRecoilState, useRecoilValue} from "recoil";
import { userEmailState } from "../../store/selectors/userEmail"
import {userState} from "../../store/atoms/user";

function Appbar(props : {
    application : string
}) {
    const router = useRouter();
    const userLoading = useRecoilValue(isUserLoading);
    const userEmail = useRecoilValue(userEmailState);
    const setUser = useSetRecoilState(userState);

  
    if (userEmail) {
        if(props.application === "Admin")
        {
            return <>
                <AdminAppBar/>
            </>
        }else
        {
            return <>
                <UserAppbar/>
            </>
        }
    } else {
        return <div style={{
            display: "flex",
            justifyContent: "space-between",
            padding: 4,
            zIndex: 1,
        }}>
            <div style={{marginLeft: 10, cursor: "pointer"}} onClick={() => {
                router.push("/");
            }}>
                <Typography variant={"h6"}>Coursera</Typography>
            </div>
    
            <div style={{display: "flex"}}>
                <div style={{marginRight: 10}}>
                    <Button
                        variant={"contained"}
                        onClick={() => {
                            router.push("/signup");
                        }}
                    >Signup</Button>
                </div>
                <div>
                    <Button
                        variant={"contained"}
                        onClick={() => {
                            router.push("/signin");
                        }}
                    >Signin</Button>
                </div>
            </div>
        </div>
    }
}

const AdminAppBar = () =>
{
    const setUser = useSetRecoilState(userState);
    const router = useRouter();
    return <div style={{
        display: "flex",
        justifyContent: "space-between",
        padding: 4,
        zIndex: 1
    }}>
        <div style={{marginLeft: 10, cursor: "pointer"}} onClick={() => {
            router.push("/");
        }}>
            <Typography variant={"h6"}>Coursera</Typography>
        </div>

        <div style={{display: "flex"}}>
            <div style={{marginRight: 10, display: "flex"}}>
            <div style={{marginRight: 10}}>
                    <Button
                        onClick={() => {
                            router.push("/addcourse");
                        }}
                    >Add course</Button>
                </div>

                <div style={{marginRight: 10}}>
                    <Button
                        onClick={() => {
                            router.push("/courses");
                        }}
                    >Courses</Button>
                </div>

                <Button
                    variant={"contained"}
                    onClick={() => {
                        localStorage.removeItem("token");
                        setUser({
                            isLoading: false,
                            userEmail: null
                        })
                        router.push('/');
                    }}
                >Logout</Button>
            </div>
        </div>
    </div>
}

const UserAppbar = () =>
{
    const setUser = useSetRecoilState(userState);
    const router = useRouter();
    return <div style={{
        display: "flex",
        justifyContent: "space-between",
        padding: 4,
        zIndex: 1
    }}>
        <div style={{marginLeft: 10, cursor: "pointer"}} onClick={() => {
            router.push("/");
        }}>
            <Typography variant={"h6"}>Coursera</Typography>
        </div>

        <div style={{display: "flex"}}>
            <div style={{marginRight: 10, display: "flex"}}>
            <div style={{marginRight: 10}}>
                    <Button
                        onClick={() => {
                            router.push("/purchasedCourses");
                        }}
                    >Purchases</Button>
                </div>

                <div style={{marginRight: 10}}>
                    <Button
                        onClick={() => {
                            router.push("/courses");
                        }}
                    >Courses</Button>
                </div>

                <Button
                    variant={"contained"}
                    onClick={() => {
                        localStorage.removeItem("token");
                        setUser({
                            isLoading: false,
                            userEmail: null
                        })
                        router.push('/');
                    }}
                >Logout</Button>
            </div>
        </div>
    </div>
}
export default Appbar;