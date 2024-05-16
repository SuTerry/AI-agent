"use client";
import { useEffect, useRef, useState } from "react";
import { Avatar, Heading, Text, IconButton } from "@radix-ui/themes";
import { BellIcon, ReaderIcon, LayersIcon, MixerHorizontalIcon, ChevronRightIcon, StarFilledIcon } from "@radix-ui/react-icons";
import classNames from 'classnames';

import CircleChart from '@/components/CircleChart';
import BarChart from '@/components/BarChart';
import LineChart from '@/components/LineChart';

export default function Home() {
  const [show, setShow] = useState(false)
  const [version, setVersion] = useState(0);
  const [countNum, setCountNum] = useState(0);
  const [countAudio, setCountAudio] = useState(0);
  const [chatter, setChatter] = useState(0);
  const [summary, setSummary] = useState(0);
  const cardBottom = [
    {
      title: 'alive Time',
      text: '11.25M',
    },
    {
      title: 'Announce',
      text: '354',
    },
    {
      title: 'Target',
      text: '3M',
    },
    {
      title: 'Placeholder',
      text: '600',
    },
  ]

  const parentRef = useRef<HTMLDivElement>(null)
  const [parentWidth, setParentWidth] = useState(0);
  useEffect(() => {
    const setRootFontSize = () => {
      const vw = window.innerWidth;
      const maxWidth = 15
      const rootFontSize = vw / 30 > maxWidth ? maxWidth : vw / 30; // 设置根字体大小为屏幕宽度的 1/100
      document.documentElement.style.fontSize = rootFontSize + 'px';
      setShow(true)
    };
    setRootFontSize();
    window.addEventListener('resize', setRootFontSize);
    return () => {
      window.removeEventListener('resize', setRootFontSize);
    };
  }, []);

  useEffect(() => {
    setParentWidth(parentRef.current?.clientWidth || 0)
  }, [show, parentRef.current])

  return (
    show && <main className="page_bg mx-auto w-full max-w-3xl  p-4">
      {/* 头部 */}
      <div className="flex justify-between mb-4">
        <div className="flex">
          {/* <!-- 左侧盒子 --> */}
          <Avatar
            radius="full"
            fallback="A"
            size="4"
            className="mr-2 bg-white"
            
          />
          <div>
            <Heading mb="0" size="3" className="text-white" >Hello,Dorothy</Heading>
            <Text mb="0" size="1" className="text-white">欢迎来到飞脑用户管理中心,呀</Text>
          </div>
        </div>
        <div className="flex items-center">
          {/* <!-- 右侧盒子 --> */}
          <div className="mr-2">
            <IconButton color="mint">
              <ReaderIcon className="text-white" width="18" height="18" />
            </IconButton>
          </div>
          <div>
            <IconButton color="mint">
              <BellIcon className="text-white" width="18" height="18" />
            </IconButton>
          </div>

        </div>
      </div>
      {/* 单选 */}
      <div className="columns-3">
        {
          ['极简版', '标准版', '专业版'].map((item, index) => {
            return (
              <div key={index} className={classNames(
                'rounded-full',
                'w-full',
                'flex',
                'justify-center',
                'items-center',
                'h-10',
                {
                  'text-cyan-700': version === index,
                  'font-semibold': version === index,
                  'bg-white': version === index,
                  'bg-cyan-100': version !== index,
                  'text-stone-600': version !== index,
                })} onClick={() => setVersion(index)}>{item}</div>
            )
          })
        }
      </div>
      {/* 卡片 */}
      <div className="mb-4">
        <div className="h-4 relative mt-2">
          <div className={classNames(
            'w-16',
            'h-16',
            'absolute',
            'triangle-box',
            {
              'left-left': version === 0,
              'left-center': version === 1,
              'left-right': version === 2,
            }
          )}>
            <svg width="100%" height="100%" viewBox="0 0 200 300">
              <polygon className="triangle" strokeLinejoin="round" points="100,120 0,200 200,200" />
            </svg>
          </div>

        </div>
        <div className="bg-white rounded-xl p-4">
          {/* 卡片上部分 */}
          <div className="border-b border-neutral-200 pb-2">
            <div className="flex items-center mb-2">
              <LayersIcon width="16" height="16" />
              <Text className="ml-2 text-base">卡片解析基本信息</Text>
            </div>
            <Text className="text-cyan-700 text-base">version:V0.8.251(a)</Text>
          </div>
          {/* 卡片下部分 */}
          <div className="flex mt-4">
            {
              cardBottom.map((item, index) => {
                return (
                  <div key={index} className={classNames('flex-auto', {
                    'border-l': index > 0,
                    'border-neutral-200': index > 0,
                    'pl-4': index > 0,
                  })}>
                    <Text className="block mb-2 text-sm">{item.title}</Text>
                    {/* <Text className="block text-cyan-700 text-xl">{item.text}</Text> */}
                    <Text className={classNames(
                      'block',
                      'text-xl',
                      {
                        'text-cyan-700': index === 2
                      }
                    )}>{item.text}</Text>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
      {/* echars */}
      <div className="flex justify-between mb-4">
        {/* echars 左侧 */}
        <div className="flex-1 mr-4 flex flex-col justify-between">
          {/* BOT发言次数统计 */}
          <div className="bg-white rounded-xl p-4 mb-4" ref={parentRef}>
            <div className="flex items-center mb-3">
              <LayersIcon width="16" height="16" />
              <Text className="ml-2 text-base">BOT发言次数统计</Text>
            </div>
            <div className="mt-1 mb-4 h-8 rounded-lg bg-gray-300 flex justify-center items-center text-white p-1">
              {
                ['Day', 'Week', 'Month'].map((item, index) => {
                  return <div key={index} className={classNames(
                    'rounded-lg',
                    'flex-1',
                    'text-center',
                    'text-base',
                    {
                      'text-gray-500': countNum !== index,
                      'text-black': countNum === index,
                      'bg-white': countNum === index,
                    }
                  )} onClick={() => setCountNum(index)}>{item}</div>
                })
              }
            </div>
            <Text className="text-base text-gray-400">08-12 August</Text>
            <BarChart parentWidth={parentWidth} />
          </div>
          {/* BOT发言频段统计 */}
          <div className="bg-white rounded-xl p-4">
            <div className="flex items-center mb-3">
              <LayersIcon width="16" height="16" />
              <Text className="ml-2 text-base">BOT发言频段统计</Text>
            </div>
            <div className="mb-4 h-8 rounded-lg bg-gray-300 flex justify-center items-center text-white p-1">
              {
                ['Day', 'Week', 'Month'].map((item, index) => {
                  return <div key={index} className={classNames(
                    'rounded-lg',
                    'flex-1',
                    'text-center',
                    'text-base',
                    {
                      'text-gray-500': countAudio !== index,
                      'text-black': countAudio === index,
                      'bg-white': countAudio === index,
                    }
                  )} onClick={() => setCountAudio(index)}>{item}</div>
                })
              }
            </div>
            <LineChart parentWidth={parentWidth} />
          </div>
        </div>
        {/* echars 右侧 */}
        <div className="flex flex-col justify-between">
          {/* 控制面板 */}
          <div className="bg-white rounded-xl pt-4 pb-3 pl-2 pr-2 mb-4">
            <div className="flex items-center mb-2">
              <MixerHorizontalIcon width="16" height="16" />
              <Text className="ml-2 text-base">控制面板</Text>
            </div>
            <Text className="text-base">Chatter</Text>
            <div className="mt-1 mb-2 h-7 rounded-full bg-cyan-700 flex justify-center items-center text-white w-28 p-1">
              {
                ['ON', 'OFF'].map((item, index) => {
                  return <div key={index} className={classNames(
                    'rounded-full',
                    'flex-1',
                    'text-center',
                    'text-base',
                    {
                      'text-cyan-700': chatter === index,
                      'bg-white': chatter === index,
                    }
                  )} onClick={() => setChatter(index)}>{item}</div>
                })
              }
            </div>
            <Text className="text-base">Summary</Text>
            <div className="mt-1 mb-4 h-7 rounded-full bg-cyan-700 flex justify-center items-center text-white w-28 p-1">
              {
                ['ON', 'OFF'].map((item, index) => {
                  return <div key={index} className={classNames(
                    'rounded-full',
                    'flex-1',
                    'text-center',
                    'text-base',
                    {
                      'text-cyan-700': summary === index,
                      'bg-white': summary === index,
                    }
                  )} onClick={() => setSummary(index)}>{item}</div>
                })
              }
            </div>
            <div className="flex items-center justify-center">
              <Text className="ml-2 text-base">更多</Text>
              <ChevronRightIcon width="18" height="18" />
            </div>
          </div>
          <div className="bg-white rounded-xl pt-4 pb-3 pl-2 pr-2">
            <CircleChart data={[{ value: 50, color: '#01798f' }]} />
            <Text className="block text-center mt-2 mb-2 text-lg font-semibold">分享总量</Text>
            <Text className="block text-center text-base">纯文本/图文类</Text>
            <Text className="block text-center text-base mb-4">26/28</Text>
            <CircleChart data={[
              { value: 75, color: '#76b8c8' },
              { value: 50, color: '#01798f' },
            ]} />
            <Text className="block text-center mt-2 mb-2 text-lg font-semibold">交互统计</Text>
            <Text className="block text-center text-base">点赞/评论/分享</Text>
            <Text className="block text-center text-base">26/28/60</Text>
          </div>
        </div>
      </div>
      {/* bottom */}
      <div className="flex justify-between items-center bg-white rounded-xl p-4 mb-4">
        <div className="flex items-center">
          <StarFilledIcon width="22" height="22" />
          <Text className="ml-2 text-lg">用户使用手册</Text>
        </div>
        <ChevronRightIcon className="font-extrabold" width="22" height="22" />
      </div>
    </main>
  );
}
