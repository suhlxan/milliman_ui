import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import ChatbotPanel from './chatbot/ChatbotPanel';

const MIN_WIDTH = 350;
const MAX_WIDTH = 600;

const DraggableChatbotPanel = ({
    visible,
    onClose,
    onWidthChange
}: {
    visible: boolean;
    onClose: () => void;
    onWidthChange?: (width: number) => void;
}) => {
    const [width, setWidth] = useState(350);
    const [resizing, setResizing] = useState(false);

    const startResize = (e: React.MouseEvent) => {
        setResizing(true);
        e.preventDefault();
    };

    const doResize = (e: MouseEvent) => {
        if (!resizing) return;
        const newWidth = Math.min(Math.max(e.clientX, MIN_WIDTH), MAX_WIDTH);
        setWidth(newWidth);
        if (onWidthChange) onWidthChange(newWidth);
    };

    const stopResize = () => {
        setResizing(false);
    };

    useEffect(() => {
        if (resizing) {
            document.addEventListener('mousemove', doResize);
            document.addEventListener('mouseup', stopResize);
        } else {
            document.removeEventListener('mousemove', doResize);
            document.removeEventListener('mouseup', stopResize);
        }

        return () => {
            document.removeEventListener('mousemove', doResize);
            document.removeEventListener('mouseup', stopResize);
        };
    }, [resizing]);

    if (!visible) return null;

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                height: '100vh',
                width: `${width}px`,
                backgroundColor: '#fff',
                borderRight: '1px solid #ccc',
                zIndex: 1200,
                display: 'flex',
                flexDirection: 'column',
                transition: 'width 0.2s ease',
            }}
        >
            {/* Resize handle */}
            <Box
                onMouseDown={startResize}
                sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    height: '100%',
                    width: '1px',
                    cursor: 'ew-resize',
                    zIndex: 1300,
                    backgroundColor: '#ffffff',
                    '&:hover': {
                        backgroundColor: '#ffffff',
                    },
                }}
            />

            <ChatbotPanel visible={visible} onClose={onClose} width={width} />
        </Box>
    );
};

export default DraggableChatbotPanel;
