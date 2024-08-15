import Star from '../../../../star/star';
import styles from './world.module.scss';

import Page from "../../../../../../src-old/components/screen-scroll/page";
import mergeClass from "../../../../../scripts/util/merge-class-name";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import StarButton from '../../../../../../src-old/components/star-button/star-button';
import Svg from '../../../../svg/svg';
import publicUse from '../../../../../scripts/util/public-use';
import TypeText from '../../../../type-text/type-text';
import random from '../../../../../scripts/util/random';

const spriteMaskValue = `url(${publicUse('/images/sprite-mask.svg')})`;

export interface ISpriteInfo {
    /** 唯一值 */
    key: string;
    /** 显示名 */
    label: string;
    /** 图片路径 */
    path: string;
    /** 对话 */
    dialogs?: string[];
}

export const sprites: ISpriteInfo[] = [
    {
        key: "fen",
        label: '昐',
        path: "/images/sprites/fen.png",
        dialogs: ["Hello Astraeus!", "My name is Fen.", "......"]
    },
];

export default function WorldPage() {
    const [sprite, setSprite] = useState<string>('fen');
    const [dialog, setDialog] = useState<string>('');

    const spriteInfo = useMemo(() => sprites.find(spr => spr.key === sprite), [sprite]);

    function updateDialog(dialogs?: string[]) {
        if (!dialogs) return;
        setDialog(prev => {
            const dialogArr = dialogs.filter(d => d !== prev);
            if (!dialogArr.length) return prev;
            return dialogArr[random(0, dialogArr.length - 1, false)];
        });
    }

    useEffect(() => updateDialog(spriteInfo?.dialogs), [spriteInfo]);

    return <Page className="w-full h-screen pt-6 pl-4 flex flex-col justify-between max-w-sm">
        {/* 上方的元素容器 */}
        <Image
            className="w-fit max-lg:h-20 max-md:h-16 max-sm:h-14 object-cover object-left-top"
            src={publicUse("/images/logo.png")}
            alt="LOGO"
            width={512}
            height={512}
        />

        {/* 立绘 */}
        <div className="absolute left-0 bottom-0 h-5/6" onClick={() => updateDialog(spriteInfo?.dialogs)}>
            <Image
                className={mergeClass("w-fit max-w-full h-full object-cover object-center", styles.sprite)}
                src={publicUse(spriteInfo?.path || '')}
                alt="sprite"
                style={{ WebkitMask: spriteMaskValue, mask: spriteMaskValue }}
                width={1920}
                height={1080}
            />
            <span className={"max-w-md absolute right-24 translate-x-1/2 text-box bottom-1/3 mr-4 pl-4 pr-4 pt-1 pb-1 text-sm text-white border-secondary"}><TypeText>{dialog}</TypeText></span>
        </div>

        <div className="fixed top-2/3 left-3/4 text-[35vh] -translate-y-1/4 text-primary-700 opacity-75 -z-10 font-black skew-y-6">ASTRAEUS</div>

        {/* 下方容器 */}
        <div className='mb-4 flex'>
            <Star className='bg-primary-300' rootClassName='max-md:hidden w-32 h-32 mr-6'>
                <Image className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 rotate-45' src={publicUse("/images/QR-code-official.png")} alt="官方bilibili音乐账号" width={512} height={512} />
            </Star>
            <div className='flex flex-col w-36 h-28 mt-2'>
                <StarButton className='flex items-center justify-evenly h-10 text-white border-secondary' size='w-14 h-14'
                    icon={<Svg src={publicUse('/images/bilibili.svg')} className='bg-primary-700' rootClassName='w-4 h-4' />}
                    onClick={() => open("https://space.bilibili.com/1350898383", '_blank')}>
                    BiliBili
                </StarButton>
                <StarButton className='flex items-center justify-evenly h-10 text-white border-secondary mt-8' size='w-14 h-14'
                    icon={<Svg src={publicUse('/images/qq.svg')} className='bg-primary-700' rootClassName='w-4 h-4' />}
                    onClick={() => open("http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=HkI_D693icdfb1PhPG55c3PT4mvLFgqO&authKey=8KSwCtb8rcKtrfUnteiQgHUOHnZUYRknxunVS4HZ%2F3L03160VnUPUQSOK%2BhFQB5Y&noverify=0&group_code=772669347", '_blank')}>
                    QQ交流群
                </StarButton>
            </div>
        </div>
    </Page>;
}
