'use client'

import Breadcrumb from "components/shared/Breadcrumb";
import PageForm from "components/pages/page/PageForm";
import {useParams} from "next/navigation";
import {useSelector} from "store";
import useSWR from "swr";
import PageService from "services/PageService";

export default function UpdatePage() {
    const params = useParams();
    const { project, workspace } = useSelector(state => state.app);

    const { data: resPage, isLoading: loading, mutate } = useSWR(
        params?.pageId ? '/api/page/update' : null,
        () => PageService.getPageById(params?.pageId)
    );

    return (
        <>
            <Breadcrumb
                title="Update Page"
                items={[
                    {title: 'Home', to: `/app/${workspace?.code}/project/${project?.id}`},
                    {title: 'Pages', to: `/app/${workspace?.code}/project/${project?.id}/page`},
                    {title: 'Update page'}
                ]}/>

            <PageForm data={resPage?.data} mutate={mutate}/>
        </>
    )
}
