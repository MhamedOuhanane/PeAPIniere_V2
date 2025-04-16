import { useEffect } from "react";
import useToken from "../../store/tokenUser"


const Logout = () => {
    const resetToken = useToken((state) => state.resetToken);
    const defaultPage = useToken((state) => state.defaultPage);
    useEffect(() => {
        resetToken();
        defaultPage();
    }, [resetToken, defaultPage]);
}

export default Logout;