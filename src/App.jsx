import React, { useState, useEffect, useRef } from 'react';
import { 
  Code2, 
  Play, 
  FileText, 
  Printer, 
  Download, 
  ChevronRight, 
  Monitor, 
  Cpu,
  Shapes,
  Palette,
  Terminal,
  Layers,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './App.css';

const assignments = [
  {
    id: 1,
    title: "Basic Shapes",
    description: "Write a program to draw basic shapes Line, Rectangle, circle, Ellipse, Arc, Polygon.",
    code: `#include <graphics.h>\n#include <conio.h>\n\nint main() {\n    int gd = DETECT, gm;\n    initgraph(&gd, &gm, "");\n\n    line(100, 100, 300, 100);\n    rectangle(100, 150, 300, 250);\n    circle(450, 200, 50);\n    ellipse(450, 350, 0, 360, 80, 40);\n    arc(200, 350, 0, 180, 50);\n    int points[] = {500, 300, 550, 350, 600, 300, 550, 250, 500, 300};\n    drawpoly(5, points);\n\n    getch();\n    closegraph();\n    return 0;\n}`,
    render: (ctx) => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(100, 100); ctx.lineTo(300, 100); ctx.stroke();
      ctx.strokeRect(100, 150, 200, 100);
      ctx.beginPath(); ctx.arc(450, 200, 50, 0, 2 * Math.PI); ctx.stroke();
      ctx.beginPath(); ctx.ellipse(450, 350, 80, 40, 0, 0, 2 * Math.PI); ctx.stroke();
      ctx.beginPath(); ctx.arc(200, 350, 50, Math.PI, 2 * Math.PI); ctx.stroke();
      const points = [500, 300, 550, 350, 600, 300, 550, 250, 500, 300];
      ctx.beginPath(); ctx.moveTo(points[0], points[1]);
      for (let i = 2; i < points.length; i += 2) ctx.lineTo(points[i], points[i+1]);
      ctx.stroke();
    }
  },
  {
    id: 2,
    title: "Fill Style & Pattern",
    description: "Write a program to draw basic shapes Fill style & Pattern.",
    code: `#include <graphics.h>\n#include <conio.h>\n\nint main() {\n    int gd = DETECT, gm;\n    initgraph(&gd, &gm, "");\n\n    setfillstyle(HATCH_FILL, RED);\n    circle(200, 200, 50);\n    floodfill(200, 200, WHITE);\n\n    setfillstyle(LINE_FILL, BLUE);\n    rectangle(300, 150, 450, 250);\n    floodfill(301, 151, WHITE);\n\n    getch();\n    closegraph();\n    return 0;\n}`,
    render: (ctx) => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(200, 200, 50, 0, 2 * Math.PI); ctx.stroke();
      ctx.fillStyle = 'rgba(255, 0, 0, 0.3)'; ctx.fill();
      ctx.strokeRect(300, 150, 150, 100);
      ctx.fillStyle = 'rgba(0, 0, 255, 0.3)'; ctx.fillRect(300, 150, 150, 100);
    }
  },
  {
    id: 3,
    title: "Line Style & Colors",
    description: "Write a program to display all Line Style & all colors.",
    code: `#include <graphics.h>\n#include <conio.h>\n\nint main() {\n    int gd = DETECT, gm;\n    initgraph(&gd, &gm, "");\n\n    for(int i=0; i<4; i++) {\n        setcolor(i + 1);\n        setlinestyle(i, 0, 3);\n        line(100, 50 + (i * 50), 500, 50 + (i * 50));\n    }\n\n    getch();\n    closegraph();\n    return 0;\n}`,
    render: (ctx) => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      const styles = [[], [15, 5], [5, 5], [15, 5, 5, 5]];
      const colors = ['#000000', '#0000ff', '#00ff00', '#ff0000'];
      for(let i=0; i<4; i++) {
          ctx.strokeStyle = colors[i];
          ctx.lineWidth = 3;
          ctx.setLineDash(styles[i]);
          ctx.beginPath();
          ctx.moveTo(100, 50 + (i * 50));
          ctx.lineTo(500, 50 + (i * 50));
          ctx.stroke();
      }
      ctx.setLineDash([]);
    }
  },
  {
    id: 4,
    title: "Solid Shapes Fill Pattern",
    description: "Write a program to demonstrate all solid shapes with different fill pattern.",
    code: `#include <graphics.h>\n#include <conio.h>\n\nint main() {\n    int gd = DETECT, gm;\n    initgraph(&gd, &gm, "");\n\n    setfillstyle(SOLID_FILL, GREEN);\n    bar(50, 50, 150, 150);\n\n    setfillstyle(SLASH_FILL, BLUE);\n    bar3d(200, 50, 300, 150, 20, 1);\n\n    setfillstyle(BKSLASH_FILL, RED);\n    pieslice(450, 100, 0, 360, 50);\n\n    getch();\n    closegraph();\n    return 0;\n}`,
    render: (ctx) => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.fillStyle = 'rgba(0, 255, 0, 0.7)';
      ctx.fillRect(50, 50, 100, 100);
      ctx.strokeRect(50, 50, 100, 100);
      ctx.fillStyle = 'rgba(0, 0, 255, 0.5)';
      ctx.fillRect(200, 50, 100, 100);
      ctx.strokeRect(200, 50, 100, 100);
      ctx.beginPath(); ctx.moveTo(200, 50); ctx.lineTo(220, 30); ctx.lineTo(320, 30); ctx.lineTo(320, 130); ctx.lineTo(300, 150); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(300, 50); ctx.lineTo(320, 30); ctx.stroke();
      ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
      ctx.beginPath(); ctx.arc(450, 100, 50, 0, 2*Math.PI); ctx.fill(); ctx.stroke();
    }
  },
  {
    id: 5,
    title: "Bar Chart / Histogram",
    description: "Draw a bar chart/ Histogram for a given data, use different fill style for different data, use proper tag/ title as required.",
    code: `#include <graphics.h>\n#include <conio.h>\n\nint main() {\n    int gd = DETECT, gm;\n    initgraph(&gd, &gm, "");\n    \n    outtextxy(200, 20, "Sales Data Bar Chart");\n    line(50, 350, 500, 350);\n    line(50, 350, 50, 50);\n    \n    setfillstyle(SOLID_FILL, RED); bar(100, 200, 150, 349);\n    setfillstyle(HATCH_FILL, BLUE); bar(200, 150, 250, 349);\n    setfillstyle(LINE_FILL, GREEN); bar(300, 100, 350, 349);\n\n    getch();\n    closegraph();\n    return 0;\n}`,
    render: (ctx) => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.strokeStyle = '#000000'; ctx.lineWidth = 2;
      ctx.fillStyle = '#000000'; ctx.font = "16px monospace";
      ctx.fillText("Sales Data Bar Chart", 200, 30);
      ctx.beginPath(); ctx.moveTo(50, 350); ctx.lineTo(500, 350); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(50, 350); ctx.lineTo(50, 50); ctx.stroke();
      ctx.fillStyle = 'rgba(255, 0, 0, 0.7)'; ctx.fillRect(100, 200, 50, 149); ctx.strokeRect(100, 200, 50, 149);
      ctx.fillStyle = 'rgba(0, 0, 255, 0.5)'; ctx.fillRect(200, 150, 50, 199); ctx.strokeRect(200, 150, 50, 199);
      ctx.fillStyle = 'rgba(0, 255, 0, 0.5)'; ctx.fillRect(300, 100, 50, 249); ctx.strokeRect(300, 100, 50, 249);
    }
  },
  {
    id: 6,
    title: "Draw a House",
    description: "Write a program to draw a house.",
    code: `#include <graphics.h>\n#include <conio.h>\n\nint main() {\n    int gd = DETECT, gm;\n    initgraph(&gd, &gm, "");\n\n    rectangle(200, 200, 400, 400);\n    line(200, 200, 300, 100);\n    line(300, 100, 400, 200);\n    rectangle(270, 300, 330, 400);\n    rectangle(220, 230, 260, 270);\n    rectangle(340, 230, 380, 270);\n\n    getch();\n    closegraph();\n    return 0;\n}`,
    render: (ctx) => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.strokeStyle = '#000000'; ctx.lineWidth = 2;
      ctx.strokeRect(200, 200, 200, 200);
      ctx.beginPath(); ctx.moveTo(200, 200); ctx.lineTo(300, 100); ctx.lineTo(400, 200); ctx.stroke();
      ctx.strokeRect(270, 300, 60, 100);
      ctx.strokeRect(220, 230, 40, 40);
      ctx.strokeRect(340, 230, 40, 40);
    }
  },
  {
    id: 7,
    title: "Animated Rainbow (Radius)",
    description: "Write a program to print animated Rainbow (radius value).",
    code: `#include <graphics.h>\n#include <conio.h>\n#include <dos.h>\n\nint main() {\n    int gd = DETECT, gm;\n    initgraph(&gd, &gm, "");\n    \n    int x = getmaxx() / 2;\n    int y = getmaxy() / 2;\n    \n    for(int i=30; i<200; i++) {\n        delay(20);\n        setcolor(i / 20);\n        arc(x, y, 0, 180, i);\n    }\n\n    getch();\n    closegraph();\n    return 0;\n}`,
    render: (ctx) => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.lineWidth = 2;
      const x = 300, y = 350;
      const colors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3'];
      for(let i=30; i<150; i+=2) {
          ctx.strokeStyle = colors[Math.floor(i/20) % 7];
          ctx.beginPath();
          ctx.arc(x, y, i, Math.PI, 2 * Math.PI);
          ctx.stroke();
      }
    }
  },
  {
    id: 8,
    title: "Animated Rainbow (Angle)",
    description: "Write a program to print animated Rainbow (angle value).",
    code: `#include <graphics.h>\n#include <conio.h>\n#include <dos.h>\n\nint main() {\n    int gd = DETECT, gm;\n    initgraph(&gd, &gm, "");\n    \n    int x = getmaxx() / 2;\n    int y = getmaxy() / 2;\n    \n    for(int i=0; i<=180; i+=2) {\n        delay(20);\n        setcolor(i / 30 + 1);\n        pieslice(x, y, 0, i, 150);\n    }\n\n    getch();\n    closegraph();\n    return 0;\n}`,
    render: (ctx) => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.lineWidth = 2;
      const x = 300, y = 300;
      ctx.strokeStyle = '#000000';
      ctx.fillStyle = '#ff7f00';
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.arc(x, y, 150, 0, Math.PI, true);
      ctx.lineTo(x, y);
      ctx.fill();
      ctx.stroke();
    }
  },
  {
    id: 9,
    title: "Random Circles",
    description: "Write a program to generate circles on the screen randomly.",
    code: `#include <graphics.h>\n#include <conio.h>\n#include <stdlib.h>\n#include <dos.h>\n\nint main() {\n    int gd = DETECT, gm;\n    initgraph(&gd, &gm, "");\n    \n    while(!kbhit()) {\n        int x = rand() % getmaxx();\n        int y = rand() % getmaxy();\n        int r = rand() % 50;\n        setcolor(rand() % 15 + 1);\n        circle(x, y, r);\n        delay(100);\n    }\n\n    closegraph();\n    return 0;\n}`,
    render: (ctx) => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.lineWidth = 1;
      for(let i=0; i<30; i++) {
          ctx.strokeStyle = 'rgba(0,0,0,0.5)';
          ctx.beginPath();
          ctx.arc(Math.random() * 600, Math.random() * 450, Math.random() * 40 + 10, 0, 2*Math.PI);
          ctx.stroke();
      }
    }
  },
  {
    id: 10,
    title: "Simple Animation (Bouncing Ball)",
    description: "Create a simple animation, such as a bouncing ball, a running train or running car.",
    code: `#include <graphics.h>\n#include <conio.h>\n#include <dos.h>\n\nint main() {\n    int gd = DETECT, gm;\n    initgraph(&gd, &gm, "");\n    \n    int x = 100, y = 100, dirY = 1;\n    while(!kbhit()) {\n        cleardevice();\n        circle(x, y, 30);\n        y += dirY * 10;\n        x += 5;\n        if(y >= getmaxy() - 30 || y <= 30) dirY *= -1;\n        if(x >= getmaxx()) x = 0;\n        delay(50);\n    }\n\n    closegraph();\n    return 0;\n}`,
    render: (ctx) => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.strokeStyle = '#000000'; ctx.lineWidth = 2;
      for(let i=0; i<5; i++) {
          ctx.beginPath();
          ctx.arc(100 + i*60, 100 + (i%2==0?0:100), 30, 0, 2*Math.PI);
          ctx.strokeStyle = `rgba(0,0,0, ${(i+1)/5})`;
          ctx.stroke();
      }
    }
  },
  {
    id: 11,
    title: "DDA Algorithm",
    description: "Write a program to print a line using DDA Algorithm.",
    code: `#include <graphics.h>\n#include <math.h>\n\nvoid drawLineDDA(int x1, int y1, int x2, int y2) {\n    float dx = x2 - x1;\n    float dy = y2 - y1;\n    float steps = abs(dx) > abs(dy) ? abs(dx) : abs(dy);\n    float xInc = dx / steps, yInc = dy / steps;\n    float x = x1, y = y1;\n    for (int i = 0; i <= steps; i++) {\n        putpixel(round(x), round(y), WHITE);\n        x += xInc; y += yInc;\n    }\n}\n\nint main() {\n    int gd = DETECT, gm;\n    initgraph(&gd, &gm, "");\n    drawLineDDA(50, 50, 400, 300);\n    getch();\n    closegraph();\n    return 0;\n}`,
    render: (ctx) => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.strokeStyle = '#000000'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(50, 50); ctx.lineTo(400, 300); ctx.stroke();
    }
  },
  {
    id: 12,
    title: "Bresenham's Line Algorithm",
    description: "Write a program to print a line using Bresenham's Line Drawing Algorithm.",
    code: `#include <graphics.h>\n#include <math.h>\n\nvoid drawLineBresenham(int x1, int y1, int x2, int y2) {\n    int dx = abs(x2 - x1), dy = abs(y2 - y1);\n    int p = 2 * dy - dx;\n    int twoDy = 2 * dy, twoDyMinusDx = 2 * (dy - dx);\n    int x = x1, y = y1;\n    putpixel(x, y, WHITE);\n    while (x < x2) {\n        x++;\n        if (p < 0) p += twoDy;\n        else { y++; p += twoDyMinusDx; }\n        putpixel(x, y, WHITE);\n    }\n}\n\nint main() {\n    int gd = DETECT, gm;\n    initgraph(&gd, &gm, "");\n    drawLineBresenham(100, 100, 500, 400);\n    getch();\n    closegraph();\n    return 0;\n}`,
    render: (ctx) => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.strokeStyle = '#000000'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(100, 100); ctx.lineTo(500, 400); ctx.stroke();
    }
  },
  {
    id: 13,
    title: "Bresenham's Circle",
    description: "Implement the Bresenham's circle drawing algorithm to draw a circle using integer arithmetic and 8-way symmetry.",
    code: `#include <graphics.h>\n\nvoid drawCircleBresenham(int xc, int yc, int r) {\n    int x = 0, y = r;\n    int p = 3 - 2 * r;\n    while (x <= y) {\n        putpixel(xc+x, yc+y, WHITE); putpixel(xc-x, yc+y, WHITE);\n        putpixel(xc+x, yc-y, WHITE); putpixel(xc-x, yc-y, WHITE);\n        putpixel(xc+y, yc+x, WHITE); putpixel(xc-y, yc+x, WHITE);\n        putpixel(xc+y, yc-x, WHITE); putpixel(xc-y, yc-x, WHITE);\n        if (p < 0) p += 4 * x + 6;\n        else { p += 4 * (x - y) + 10; y--; }\n        x++;\n    }\n}\n\nint main() {\n    int gd = DETECT, gm;\n    initgraph(&gd, &gm, "");\n    drawCircleBresenham(300, 200, 100);\n    getch();\n    closegraph();\n    return 0;\n}`,
    render: (ctx) => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.strokeStyle = '#000000'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(300, 200, 100, 0, 2*Math.PI); ctx.stroke();
    }
  },
  {
    id: 14,
    title: "2D Transformations",
    description: "Develop a program to demonstrate all 2D transformation (translation, rotation, scaling, mirroring, shearing).",
    code: `#include <graphics.h>\n#include <math.h>\n\nint main() {\n    int gd = DETECT, gm;\n    initgraph(&gd, &gm, "");\n    \n    // Original Rectangle\n    rectangle(100, 100, 200, 150);\n    \n    // Translation\n    rectangle(100+100, 100+50, 200+100, 150+50); \n    \n    // Scaling\n    rectangle(100, 100, 100+(100*2), 100+(50*2));\n    \n    // Rotation\n    int x = 100, y = 100;\n    float theta = 45 * 3.14 / 180;\n    int nx = x * cos(theta) - y * sin(theta);\n    int ny = x * sin(theta) + y * cos(theta);\n\n    getch();\n    closegraph();\n    return 0;\n}`,
    render: (ctx) => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.strokeStyle = '#000000'; ctx.lineWidth = 2;
      ctx.strokeRect(100, 100, 100, 50);
      ctx.strokeStyle = 'rgba(0,0,0,0.3)';
      ctx.strokeRect(200, 150, 100, 50);
      ctx.strokeRect(100, 100, 200, 100);
    }
  },
  {
    id: 15,
    title: "3D Transformations",
    description: "Develop a program to demonstrate 3D transformation (translation, rotation, scaling).",
    code: `#include <graphics.h>\n\nint main() {\n    int gd = DETECT, gm;\n    initgraph(&gd, &gm, "");\n    \n    // Original 3D Bar\n    bar3d(100, 100, 150, 200, 20, 1);\n    \n    // Translated 3D Bar\n    int tx = 100, ty = 50;\n    bar3d(100+tx, 100+ty, 150+tx, 200+ty, 20, 1);\n    \n    // Scaled 3D Bar\n    int sx = 2, sy = 2;\n    bar3d(100, 100, 100+(50*sx), 100+(100*sy), 20*sx, 1);\n\n    getch();\n    closegraph();\n    return 0;\n}`,
    render: (ctx) => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.strokeStyle = '#000000'; ctx.lineWidth = 2;
      ctx.strokeRect(100, 100, 50, 100);
      ctx.beginPath(); ctx.moveTo(100, 100); ctx.lineTo(120, 80); ctx.lineTo(170, 80); ctx.lineTo(170, 180); ctx.lineTo(150, 200); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(150, 100); ctx.lineTo(170, 80); ctx.stroke();
      
      ctx.strokeStyle = 'rgba(0,0,0,0.3)';
      ctx.strokeRect(200, 150, 50, 100);
    }
  },
  {
    id: 16,
    title: "Fractal Pattern (Koch)",
    description: "Generate a fractal pattern like a Koch diagram/ tree/ snowflake/ etc. using recursion concepts.",
    code: `#include <graphics.h>\n#include <math.h>\n\nvoid koch(int x1, int y1, int x2, int y2, int it) {\n    float angle = 60 * 3.14 / 180;\n    int x3 = (2*x1 + x2) / 3, y3 = (2*y1 + y2) / 3;\n    int x4 = (x1 + 2*x2) / 3, y4 = (y1 + 2*y2) / 3;\n    int x = x3 + (x4-x3)*cos(angle) + (y4-y3)*sin(angle);\n    int y = y3 - (x4-x3)*sin(angle) + (y4-y3)*cos(angle);\n    if(it > 0) {\n        koch(x1, y1, x3, y3, it-1);\n        koch(x3, y3, x, y, it-1);\n        koch(x, y, x4, y4, it-1);\n        koch(x4, y4, x2, y2, it-1);\n    } else {\n        line(x1, y1, x3, y3); line(x3, y3, x, y);\n        line(x, y, x4, y4); line(x4, y4, x2, y2);\n    }\n}\n\nint main() {\n    int gd = DETECT, gm;\n    initgraph(&gd, &gm, "");\n    koch(100, 200, 500, 200, 3);\n    getch();\n    closegraph();\n    return 0;\n}`,
    render: (ctx) => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.strokeStyle = '#000000'; ctx.lineWidth = 1;
      
      function drawKoch(x1, y1, x2, y2, it) {
          if (it === 0) {
              ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
              return;
          }
          const dx = x2 - x1, dy = y2 - y1;
          const p1x = x1 + dx / 3, p1y = y1 + dy / 3;
          const p3x = x1 + 2 * dx / 3, p3y = y1 + 2 * dy / 3;
          const p2x = p1x + (dx / 3) * Math.cos(Math.PI / 3) - (dy / 3) * Math.sin(Math.PI / 3);
          const p2y = p1y + (dx / 3) * Math.sin(Math.PI / 3) + (dy / 3) * Math.cos(Math.PI / 3);
          
          drawKoch(x1, y1, p1x, p1y, it - 1);
          drawKoch(p1x, p1y, p2x, p2y, it - 1);
          drawKoch(p2x, p2y, p3x, p3y, it - 1);
          drawKoch(p3x, p3y, x2, y2, it - 1);
      }
      drawKoch(100, 300, 500, 300, 4);
    }
  }
];

function App() {
  const [activeTab, setActiveTab] = useState(assignments[0]);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const canvasRef = useRef(null);
  const reportRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      activeTab.render(ctx);
    }
  }, [activeTab]);

  const handleDownloadReport = async () => {
    const element = reportRef.current;
    const canvas = await html2canvas(element, {
      backgroundColor: '#ffffff',
      scale: 2,
    });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('CG_Assignment_' + activeTab.id + '.pdf');
  };

  const handleDownloadScreenshot = () => {
    const link = document.createElement('a');
    link.download = 'Output_Assignment_' + activeTab.id + '.png';
    link.href = canvasRef.current.toDataURL();
    link.click();
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="glass">
        <div className="header-content">
          <button 
            className="mobile-menu-btn" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="logo">
            <Cpu className="icon-accent" size={28} />
            <h1>PixelCraft <span className="gradient-text">CG Lab</span></h1>
          </div>
          <div className="user-info">
            <button 
              className="btn-icon desktop-only" 
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              title={isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
            >
              <Monitor size={20} />
            </button>
            <span className="badge">BCA VI - MJL14CPA</span>
            <span className="deadline">Due: 15 May 2026</span>
          </div>
        </div>
      </header>

      <main>
        <div 
          className={`mobile-backdrop ${isMobileMenuOpen ? 'active' : ''}`} 
          onClick={() => setIsMobileMenuOpen(false)}
        />
        {/* Sidebar */}
        <aside className={`glass ${isSidebarOpen ? 'open' : 'closed'} ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <div className="sidebar-header">
            <h3>Assignments</h3>
          </div>
          <nav>
            {assignments.map(item => (
              <button 
                key={item.id}
                className={'nav-item ' + (activeTab.id === item.id ? 'active' : '')}
                onClick={() => {
                  setActiveTab(item);
                  setIsMobileMenuOpen(false);
                }}
              >
                <Shapes size={18} style={{minWidth: '18px'}} />
                <span style={{overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{item.id}. {item.title}</span>
                {activeTab.id === item.id && <ChevronRight size={16} />}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content Area */}
        <div className="content">
          <div className="workspace-grid">
            {/* Editor Panel */}
            <section className="glass panel editor-panel">
              <div className="panel-header">
                <div className="title">
                  <Code2 size={20} className="icon-cyan" />
                  <h4>Source Code</h4>
                </div>
              </div>
              <div className="code-container">
                <pre>
                  <code>{activeTab.code}</code>
                </pre>
              </div>
            </section>

            {/* Output Panel */}
            <section className="glass panel output-panel">
              <div className="panel-header">
                <div className="title">
                  <Monitor size={20} className="icon-purple" />
                  <h4>Execution Output</h4>
                </div>
                <div className="actions">
                  <button className="btn btn-secondary" onClick={handleDownloadScreenshot}>
                    <Download size={16} /> Screenshot
                  </button>
                  <button className="btn btn-primary" onClick={handleDownloadReport}>
                    <Printer size={16} /> Print Report
                  </button>
                </div>
              </div>
              <div className="canvas-container">
                <canvas 
                  ref={canvasRef} 
                  width={600} 
                  height={450} 
                  className="bgi-canvas"
                />
              </div>
            </section>
          </div>

          {/* Hidden Report Template (for PDF generation) */}
          <div style={{ position: 'absolute', left: '-9999px' }}>
            <div ref={reportRef} className="report-template">
              <div className="report-header">
                <h1>MJL14CPA - Computer Graphics Lab</h1>
                <h2>Assignment #{activeTab.id}: {activeTab.title}</h2>
                <div className="report-meta">
                  <p><strong>Student Name:</strong> Aditya</p>
                  <p><strong>Course:</strong> BCA VI</p>
                  <p><strong>Date:</strong> May 14, 2026</p>
                </div>
              </div>
              
              <div className="report-section">
                <h3>Problem Statement</h3>
                <p>{activeTab.id}. {activeTab.description}</p>
              </div>

              <div className="report-section">
                <h3>C++ Implementation</h3>
                <div className="report-code">
                  <pre>{activeTab.code}</pre>
                </div>
              </div>

              <div className="report-section">
                <h3>Program Output</h3>
                <div className="report-output-image">
                  <img src={canvasRef.current?.toDataURL()} alt="Output Screenshot" />
                </div>
              </div>

              <div className="report-footer">
                <p>© 2026 Computer Graphics Lab Assignment Submission</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
