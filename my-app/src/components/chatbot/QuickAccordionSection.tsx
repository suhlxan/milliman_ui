import React from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DescriptionIcon from '@mui/icons-material/Description';

interface QuickAccordionSectionProps {
    onSelect: (value: string) => void;
    expandedIndex: number | null;
    setExpandedIndex: (index: number | null) => void;
}

const QuickAccordionSection: React.FC<QuickAccordionSectionProps> = ({ onSelect, expandedIndex, setExpandedIndex }) => {
    const groups = [
        {
            category: '📄 Medical Records',
            questions: [
                'What diagnoses were found in the medical records?',
                'What medical procedures were performed?',
                'Create a graph comparing medical claims by year?',
                'Show me the most recent medical claims',
            ],
        },
        {
            category: '💊 Medications',
            questions: [
                'What medications is this patient taking?',
                'Create a graph comparing medical and pharmacy claims by year?',
                'Are there any diabetes medications?',
                'What blood pressure medications are prescribed?',
            ],
        },
        {
            category: '❤️ Risk Assessment',
            questions: [
                'What is the heart attack risk and why?',
                'When did patient diagnosed with diabetes?',
                'When did patient started taking diabetes medication?',
                'What chronic conditions does this patient have?',
            ],
        },
        {
            category: '📊 Analysis',
            questions: [
                'Predict the patient life expectancy with two scenarios 1) adhering to the medication 2) non-adhering to the medication?',
                'How has the patients health changed over time?',
                'What patterns do you see in the claims data?',
                'Provide a comprehensive health overview',
            ],
        },
    ];

    return (
        <Box sx={{ mb: 3, px: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>
                💡Quick Questions
            </Typography>

            {groups.map((group, index) => (
                <Accordion
                    key={index}
                    expanded={expandedIndex === index}
                    onChange={() => setExpandedIndex(expandedIndex === index ? null : index)}
                    disableGutters
                    sx={{
                        borderRadius: 2,
                        boxShadow: 'none',
                        mb: 1,
                        border: '1px solid #E0E0E0',
                        '&:before': { display: 'none' },
                    }}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        sx={{
                            px: 2,
                            py: 1,
                            color: '#1A1A1A',
                            border: '1px solid #E0E0E0',
                            borderRadius: 2,
                            transition: 'border-color 0.2s ease',
                            '&:hover': {
                                borderColor: '#90CAF9',
                            },
                        }}
                    >
                        <Typography sx={{ fontSize: '0.95rem' }}>{group.category}</Typography>
                    </AccordionSummary>

                    <AccordionDetails sx={{ px: 2, pb: 2 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            {group.questions.map((q, i) => (
                                <Box
                                    key={i}
                                    onClick={() => onSelect(q)}
                                    sx={{
                                        px: 2,
                                        py: 1,
                                        backgroundColor: '#fff',
                                        borderRadius: 2,
                                        cursor: 'pointer',
                                        border: '1px solid #E0E0E0',
                                        color: '#333',
                                        fontSize: '0.875rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        '&:hover': {
                                            background: 'linear-gradient(90deg, #E8F0FE 0%, #F0F4FF 100%)',
                                            borderColor: '#B0C4DE',
                                        },
                                    }}
                                >
                                    {q}
                                </Box>
                            ))}
                        </Box>
                    </AccordionDetails>
                </Accordion>
            ))}

            {/* Quick Access Section */}
            <Box sx={{ mt: 3 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>
                    Quick Access
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Box
                        onClick={() => onSelect('Summary')}
                        sx={{
                            px: 3,
                            py: 0.6,
                            backgroundColor: '#fff',
                            borderRadius: 3,
                            cursor: 'pointer',
                            border: '2px solid #1976D2',
                            boxShadow: '0 1px 3px rgba(25, 118, 210, 0.1)',
                            color: '#000',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            fontSize: '0.85rem',
                            transition: 'all 0.25s ease-in-out',
                            '&:hover': {
                                background: 'linear-gradient(90deg, #E8F0FE 0%, #F0F4FF 100%)',
                                borderColor: '#0D47A1',
                                boxShadow: '0 4px 12px rgba(13, 71, 161, 0.2)',
                                transform: 'scale(1.02)',
                            },
                        }}
                    >
                        <DescriptionIcon sx={{ fontSize: 18, color: '#1976D2' }} />
                        Summary
                    </Box>

                    <Box
                        onClick={() => onSelect('Heart Risk')}
                        sx={{
                            px: 3,
                            py: 0.6,
                            backgroundColor: '#fff',
                            borderRadius: 3,
                            cursor: 'pointer',
                            border: '2px solid #D32F2F',
                            boxShadow: '0 1px 3px rgba(211, 47, 47, 0.1)',
                            color: '#000',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            fontSize: '0.85rem',
                            transition: 'all 0.25s ease-in-out',
                            '&:hover': {
                                background: 'linear-gradient(90deg, #FFEDEE 0%, #FFF5F5 100%)',
                                borderColor: '#B71C1C',
                                boxShadow: '0 4px 12px rgba(183, 28, 28, 0.2)',
                                transform: 'scale(1.02)',
                            },
                        }}
                    >
                        <FavoriteIcon sx={{ fontSize: 18, color: '#D32F2F' }} />
                        Heart Risk
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default QuickAccordionSection;
