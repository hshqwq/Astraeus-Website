import publicUse from '../../../scripts/util/public-use';
import Svg from '../svg/svg';
import { useEffect, useState } from 'react';
import Star from '../star/star';

const copyShareLink = () => {
    const failedText = '链接复制失败 (っ °Д °;)っ';
    const res = navigator?.clipboard.writeText(location.href)
        .then(() => '分享链接已复制 ヾ(•ω•`)o') || failedText;

    return res;
};

export default function NewsboardBarBtn(name:string,state:boolean) {
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        if (message)
            setTimeout(() => setMessage(''), 5000);
    }, [message]);

    return <button className='relative' onClick={async () => setMessage(await copyShareLink())}>
        <Svg key="share-button"
            src={publicUse('/images/share.svg')}
            rootClassName='relative w-8 h-8 p-1'
            className={'bg-white hover:bg-secondary transition-colors duration-200'}
        />
        {!!message && <div className="text-box border-secondary absolute text-xs p-2 top-full -right-2 mt-4 z-10 w-fit whitespace-nowrap">
            <Star className="bg-secondary" rootClassName='absolute top-0 right-1 w-4 h-4 -translate-y-1/2' />
            {message}
        </div>}
    </button>;
}