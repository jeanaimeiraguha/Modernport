import { FaCode, FaAws, FaCss3Alt } from 'react-icons/fa';
import {
  SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiHtml5,
  SiNodedotjs, SiPostgresql, SiMongodb, SiRedis, SiFirebase, SiGraphql,
  SiTailwindcss, SiRedux, SiTensorflow, SiOpencv, SiPython, SiSolidity,
  SiWeb3Dotjs, SiDocker, SiGithubactions, SiNginx, SiStripe, SiSocketdotio,
  SiD3, SiMysql, SiChartdotjs, SiRaspberrypi, SiMqtt, SiEthereum,
} from 'react-icons/si';

export const TECH_ICONS = {
  'React':           { Icon: SiReact,        color: '#61DAFB' },
  'React Native':    { Icon: SiReact,         color: '#61DAFB' },
  'Next.js':         { Icon: SiNextdotjs,     color: '#ffffff' },
  'TypeScript':      { Icon: SiTypescript,    color: '#3178C6' },
  'JavaScript':      { Icon: SiJavascript,    color: '#F7DF1E' },
  'HTML5':           { Icon: SiHtml5,         color: '#E34F26' },
  'Node.js':         { Icon: SiNodedotjs,     color: '#3C873A' },
  'PostgreSQL':      { Icon: SiPostgresql,    color: '#4169E1' },
  'MongoDB':         { Icon: SiMongodb,       color: '#47A248' },
  'Redis':           { Icon: SiRedis,         color: '#DC382D' },
  'Firebase':        { Icon: SiFirebase,      color: '#FFCA28' },
  'GraphQL':         { Icon: SiGraphql,       color: '#E10098' },
  'Tailwind CSS':    { Icon: SiTailwindcss,   color: '#38BDF8' },
  'Redux Toolkit':   { Icon: SiRedux,         color: '#764ABC' },
  'CSS3':            { Icon: FaCss3Alt,       color: '#1572B6' },
  'TensorFlow':      { Icon: SiTensorflow,    color: '#FF6F00' },
  'OpenCV':          { Icon: SiOpencv,        color: '#5C3EE8' },
  'Python':          { Icon: SiPython,        color: '#3776AB' },
  'Solidity':        { Icon: SiSolidity,      color: '#a78bfa' },
  'Web3.js':         { Icon: SiWeb3Dotjs,     color: '#F16822' },
  'Docker':          { Icon: SiDocker,        color: '#2496ED' },
  'AWS':             { Icon: FaAws,           color: '#FF9900' },
  'GitHub Actions':  { Icon: SiGithubactions, color: '#2088FF' },
  'Nginx':           { Icon: SiNginx,         color: '#009639' },
  'Stripe':          { Icon: SiStripe,        color: '#635BFF' },
  'Socket.io':       { Icon: SiSocketdotio,   color: '#ffffff' },
  'D3.js':           { Icon: SiD3,            color: '#F9A03C' },
  'MySQL':           { Icon: SiMysql,         color: '#4479A1' },
  'Chart.js':        { Icon: SiChartdotjs,    color: '#FF6384' },
  'Raspberry Pi':    { Icon: SiRaspberrypi,   color: '#A22846' },
  'MQTT':            { Icon: SiMqtt,          color: '#660066' },
  'Ethereum':        { Icon: SiEthereum,      color: '#a78bfa' },
  'Hardhat':         { Icon: FaCode,          color: '#fbbf24' },
  'YOLOv8':          { Icon: FaCode,          color: '#facc15' },
  'YOLO':            { Icon: FaCode,          color: '#facc15' },
  'JWT':             { Icon: FaCode,          color: '#fca5a5' },
  'Plaid':           { Icon: FaCode,          color: '#00d3ab' },
  'Zustand':         { Icon: FaCode,          color: '#ff8a65' },
};

export function getTechIcon(name) {
  return TECH_ICONS[name] || { Icon: FaCode, color: 'var(--accent)' };
}
