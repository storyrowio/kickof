'use client'

import Breadcrumb from "components/shared/Breadcrumb";
import {useSelector} from "store";
import PageForm from "components/pages/page/PageForm";

export default function CreatePage() {
    const { project, workspace } = useSelector(state => state.app);

    return (
        <>
            <Breadcrumb
                title="Create Page"
                items={[
                    {title: 'Home', to: `/app/${workspace?.code}/project/${project?.id}`},
                    {title: 'Pages', to: `/app/${workspace?.code}/project/${project?.id}/page`},
                    {title: 'Create page'}
                ]}/>

            <PageForm/>
        </>
    )
}
