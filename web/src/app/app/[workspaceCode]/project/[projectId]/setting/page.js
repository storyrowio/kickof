'use client'

import {Box, Tab, Tabs} from "@mui/material";
import {useEffect, useState} from "react";
import ProjectInformationSection from "components/pages/project/setting/ProjectInformationSection";
import ProjectLabelSection from "components/pages/project/setting/ProjectLabelSection";
import ProjectMemberSection from "components/pages/project/setting/ProjectMemberSection";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

export default function ProjectSetting() {
    const pathname = usePathname();
    const queryParams = useSearchParams();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState(0);
    const tabs = [
        { label: 'Information' },
        { label: 'Members' },
        { label: 'Task Labels' },
    ];

    useEffect(() => {
        if (queryParams.get('tab')) {
            const tabIndex = tabs.findIndex(e => e.label.toLowerCase() === queryParams.get('tab'));
            setActiveTab(tabIndex);
        }
    }, [queryParams.get('tab')]);

    const renderTabContent = () => {
        switch (activeTab) {
            case 0:
                return <ProjectInformationSection/>;
            case 1:
                return <ProjectMemberSection/>;
            case 2:
                return <ProjectLabelSection/>
            default:
                return null
        }
    };

    const handleChangeTab = (val) => {
        router.push(`${pathname}?tab=${tabs[val].label.toLowerCase()}`);
    };

    return (
        <>
            <Tabs value={activeTab} onChange={(e, val) => handleChangeTab(val)}>
                {tabs.map((e, i) => (
                    <Tab key={i} label={e.label} />
                ))}
            </Tabs>
            <Box height={20}/>
            {renderTabContent()}
        </>
    )
}
