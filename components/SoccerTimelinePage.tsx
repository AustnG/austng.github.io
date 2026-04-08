import React from 'react';
import { SoccerIcon, MortarBoardIcon } from './Icons';
import { TimelineEvent } from '../types';

const clubCareer: TimelineEvent[] = [
    { name: 'Wolves Soccer Club', years: '2001 - 2004', description: 'My first steps in organized soccer. Learned the fundamentals and developed a lifelong passion for the game.' },
    { name: 'SKY Soccer Club', years: '2004 - 2007', description: 'Transitioned to a more competitive environment, honing skills and playing in regional tournaments.' },
    { name: 'Javanon', years: '2007 - 2009', description: 'Played for a top-tier club, competing at state and national levels, which was a formative experience.' },
    { name: 'BG International', years: '2015', description: 'Post-collegiate play with a focus on high-level amateur competition and maintaining fitness.' },
    { name: "Rocky's FC", years: '2019', description: 'Joined a local team, enjoying the competitive spirit and camaraderie of the game.' },
    { name: 'BG Elite FC', years: '2020', description: 'A season with a highly competitive amateur club, pushing my skills to new limits.' },
    { name: 'BGFC Golden Lions (UPSL)', years: '2021', description: 'Stepped up to the semi-professional level, playing in the UPSL against talented teams from across the region.' },
    { name: 'Toasty FC', years: '2022 - Present', description: 'Currently playing with Toasty FC, contributing to a team with strong ambitions and great players.' },
];

const schoolAndCoachingCareer: TimelineEvent[] = [
    { name: 'BGHS Purples', years: '2005 - 2009', description: 'Represented my high school team, learning the importance of teamwork and discipline.' },
    { name: 'Centre Soccer', years: '2009 - 2013', description: 'Competed at the collegiate level, balancing academics with the high demands of varsity sports.' },
    { name: 'COACH: Purples JV Soccer', years: '2025 -', description: 'Giving back to the game by coaching the JV team at my alma mater, shaping the next generation of players.' },
];


interface TimelineItemProps {
    item: TimelineEvent;
    icon: React.ComponentType<{ className?: string }>;
    isLast: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ item, icon: Icon, isLast }) => (
    <li className="relative">
        <div className="pl-12">
            {/* The line */}
            {!isLast && <div className="absolute left-[19px] top-5 w-px h-full bg-slate-700"></div>}
            
            {/* The icon circle */}
            <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 ring-4 ring-slate-900">
                <Icon className="h-5 w-5 text-slate-400" />
            </div>

            {/* Content */}
            <div className="pb-10">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                    <h3 className="text-base font-semibold text-slate-100">{item.name}</h3>
                    <p className="text-sm text-slate-400 mt-1 sm:mt-0">{item.years}</p>
                </div>
                <p className="mt-2 text-sm text-slate-400">{item.description}</p>
            </div>
        </div>
    </li>
);

interface TimelineSectionProps {
    title: string;
    items: TimelineEvent[];
    icon: React.ComponentType<{ className?: string }>;
}

const TimelineSection: React.FC<TimelineSectionProps> = ({ title, items, icon }) => (
    <div className="mb-12 last:mb-0">
        <h2 className="text-2xl font-bold text-slate-100 mb-8">{title}</h2>
        <ul role="list">
             {items.map((item, index) => (
                <TimelineItem 
                    key={index} 
                    item={item} 
                    icon={icon} 
                    isLast={index === items.length - 1}
                />
            ))}
        </ul>
    </div>
);

const SoccerTimelinePage: React.FC = () => {
    return (
        <div className="w-full max-w-3xl mx-auto text-slate-300 px-4">
            <header className="text-center my-12 sm:my-16">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-100">My Soccer Journey</h1>
                <p className="text-slate-400 mt-3 max-w-2xl mx-auto">A timeline of my career, from kicking a ball as a kid to coaching the next generation.</p>
            </header>

            <main>
                <TimelineSection 
                    title="Club Career" 
                    items={clubCareer} 
                    icon={SoccerIcon}
                />
                <TimelineSection 
                    title="School & Coaching" 
                    items={schoolAndCoachingCareer} 
                    icon={MortarBoardIcon}
                />
            </main>

            <footer className="text-center mt-8 mb-12 text-sm text-slate-500">
                <p>Built with passion for the beautiful game.</p>
            </footer>
        </div>
    );
};

export default SoccerTimelinePage;