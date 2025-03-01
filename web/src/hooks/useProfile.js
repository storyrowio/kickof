import {useDispatch, useSelector} from "store";
import AppStorage from "utils/storage";
import {AUTH_TOKEN} from "constants/storage";

const useProfile = () => {
    const { id, ...profile } = useSelector(state => state.profile);
    const dispatch = useDispatch();
    const token = AppStorage.GetItem(AUTH_TOKEN);

    // const { data: resProfile } = useSWR((!id && token) ? '/api/profile' : null, () => AuthService.GetProfile());
    // const { data: resSetting } = useSWR((!id && token) ? '/api/setting' : null, () => SettingService.GetSettingByQuery({}));
    //
    // useEffect(() => {
    //     if (!id && resProfile?.data?.data) {
    //         dispatch(ProfileActions.setProfile(resProfile?.data?.data));
    //     }
    // }, [dispatch, id, resProfile?.data?.data]);
    //
    // const mounted = useRef(false);
    // useEffect(() => {
    //     if (!mounted.current && resSetting) {
    //         dispatch(AppSlice.actions.setSetting(resSetting?.data));
    //
    //         mounted.current = true;
    //     }
    // }, [dispatch, resSetting]);

    return {
        // ...(id ? {id, ...profile} : {...resProfile?.data?.data})
        permissions: [
            'all',
            'user:read'
        ]
    };
};

export default useProfile;
