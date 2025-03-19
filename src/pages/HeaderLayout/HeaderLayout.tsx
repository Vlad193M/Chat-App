import { Outlet, useLocation, useNavigate } from "react-router";
import classes from "./HeaderLayout.module.css";

import { useEffect } from "react";
import Header from "../../components/Header/Header";
import Modal from "../../components/UI/Modal/Modal";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-custom-hooks";
import { watchAuthState } from "../../store/auth/auth-actions";

const HeaderLayout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    const unsubscribe = dispatch(watchAuthState());

    return () => unsubscribe();
  }, []);

  const { user, loading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    console.log(user?.emailVerified);
    if (!loading && !user?.emailVerified && pathname !== "/sign-up") {
      navigate("/log-in");
    } else if (user) {
      navigate("/chat");
    }
  }, [loading, user?.emailVerified, navigate]);

  if (loading) {
    return (
      <div className="container">
        <Header />
        <h1 className={classes.loading}>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="container">
      <Header />
      <Outlet />
      {/* <Modal open={true} text="Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem" buttonText="Ok" ></Modal> */}
    </div>
  );
};

export default HeaderLayout;
