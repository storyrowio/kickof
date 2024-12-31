import PropTypes from "prop-types";
import {useSelector} from "store";
import Roles from "constants/role";

CanAccess.propTypes = {
    permissions: PropTypes.array,
};

export default function CanAccess(props) {
    const { roles, permissions, children } = props;
    const profile = useSelector(state => state.profile);

    if (permissions?.includes('all') || roles?.includes(Roles.admin) || permissions?.some(e => profile?.permissions.some(a => a === e))) {
        return children;
    }
    // if ((roles?.includes(Roles.admin) && profile?.role?.code === Roles.admin) ||
    //     profile?.permissions?.includes('all') || permissions.length === 0 || permissions?.some(e => profile?.permissions.some(a => a === e))) {
    //     return children;
    // }

    return <div/>;
}
