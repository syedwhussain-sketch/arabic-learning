import { Card, CardContent, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Accordion, AccordionSummary, AccordionDetails, useMediaQuery, useTheme, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import type { VerbCategory, VerbSubCategory } from '../types/verb.types';
// Theme-aware colors are derived from MUI theme palette; no hardcoded constants

interface VerbCardProps {
  data: VerbCategory;
}

export function VerbCard({ data }: VerbCardProps) {
  const [expandedMain, setExpandedMain] = useState<boolean>(true);
  const [expandedSubCategory, setExpandedSubCategory] = useState<string | false>(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isDark = theme.palette.mode === 'dark';

  // Neutral grayscale backgrounds for rows (theme-aware)
  // Slightly lighter for female rows to differentiate
  const getRowBg = (female?: boolean) => {
    if (isDark) 
      return female ? 'rgba(255,255,255,0.11)' : 'rgba(255,255,255,0.04)';

    return female ? 'rgba(0,0,0,0.09)' : 'rgba(0,0,0,0.04)';
  };
  const getRowHoverBg = (female?: boolean) => {
    if (isDark) return female ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.08)';
    return female ? 'rgba(0,0,0,0.07)' : 'rgba(0,0,0,0.08)';
  };

  const handleSubCategoryChange = (subCategoryId: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedSubCategory(isExpanded ? subCategoryId : false);
  };

  // Use explicit gender from data
  const isFeminine = (conj: VerbSubCategory['conjugations'][number]): boolean => {
    return conj.gender === 'female';
  };

  const renderSubCategoryConjugation = (subCategory: VerbSubCategory) => {
    if (subCategory.conjugations.length === 0) {
      return (
        <Box sx={{ p: 3, textAlign: 'center', color: 'text.secondary' }}>
          <Typography>Coming soon...</Typography>
        </Box>
      );
    }

    return (
      <Box id={`containerSubCategoryContent-${subCategory.id}`} sx={{ p: 3 }}>
        {/* Mobile: stacked cards */}
        {isMobile ? (
          <Box id={`mobileConjugations-${subCategory.id}`} sx={{ display: 'flex', flexDirection: 'column', gap: 2, direction: 'rtl' }}>
            {subCategory.conjugations.map((conj, index) => {
              const showTranslation = true; // Show translation for all rows
              return (
                <Paper key={index} elevation={0} sx={{ p: 2, borderRadius: 2, bgcolor: getRowBg(isFeminine(conj)) }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{conj.pronounArabic}</Typography>
                    {showTranslation && conj.pronoun && (
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>{conj.pronoun}</Typography>
                    )}
                  </Box>
                  <Divider sx={{ my: 1 }} />
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                    <Typography variant="body1"><strong>الماضي:</strong> {conj.past} {showTranslation && conj.pastEnglish && (<Typography component="span" variant="caption" sx={{ color: 'text.secondary' }}>({conj.pastEnglish})</Typography>)}</Typography>
                    <Typography variant="body1"><strong>المضارع:</strong> {conj.present} {showTranslation && conj.presentEnglish && (<Typography component="span" variant="caption" sx={{ color: 'text.secondary' }}>({conj.presentEnglish})</Typography>)}</Typography>
                    <Typography variant="body1"><strong>الأمر:</strong> {conj.imperative || '-'} {showTranslation && conj.imperativeEnglish && (<Typography component="span" variant="caption" sx={{ color: 'text.secondary' }}>({conj.imperativeEnglish})</Typography>)}</Typography>
                    <Typography variant="body1"><strong>لَمْ:</strong> {conj.negationPast} {showTranslation && conj.negationPastEnglish && (<Typography component="span" variant="caption" sx={{ color: 'text.secondary' }}>({conj.negationPastEnglish})</Typography>)}</Typography>
                    <Typography variant="body1"><strong>لَنْ:</strong> {conj.negationFuture} {showTranslation && conj.negationFutureEnglish && (<Typography component="span" variant="caption" sx={{ color: 'text.secondary' }}>({conj.negationFutureEnglish})</Typography>)}</Typography>
                    <Typography variant="body1"><strong>لا:</strong> {conj.negationJussive} {showTranslation && conj.negationJussiveEnglish && (<Typography component="span" variant="caption" sx={{ color: 'text.secondary' }}>({conj.negationJussiveEnglish})</Typography>)}</Typography>
                    <Typography variant="body1"><strong>اسم الفاعل:</strong> {conj.participle || '-' } {showTranslation && conj.participleEnglish && (<Typography component="span" variant="caption" sx={{ color: 'text.secondary' }}>({conj.participleEnglish})</Typography>)}</Typography>
                  </Box>
                </Paper>
              );
            })}
          </Box>
        ) : (
          /* Desktop/Tablet: keep table */
          <TableContainer id={`tableContainerConjugation-${subCategory.id}`} component={Paper} variant="outlined" sx={{ direction: 'rtl', mb: 3, borderRadius: 2, boxShadow: 1, bgcolor: 'background.paper' }}>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ bgcolor: 'background.paper' }}>
                    <TableCell sx={{ fontWeight: 'bold' }}>الضمير</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>الماضي</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>المضارع</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>الأمر</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>لَمْ</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>لَنْ</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>لا</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>اسم الفاعل</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {subCategory.conjugations.map((conj, index) => {
                    const showTranslation = true; // Show translation for all rows
                    const isFeminineRow = isFeminine(conj);
                    return (
                      <TableRow
                        key={index}
                        hover
                        sx={{
                          bgcolor: getRowBg(isFeminineRow),
                          '&:hover': {
                            bgcolor: getRowHoverBg(isFeminineRow)
                          }
                        }}
                      >
                        <TableCell sx={{ fontSize: '1.1rem' }}>
                          <Box id={`cellPronoun-${subCategory.id}-${index}`}>
                            <div>{conj.pronounArabic}</div>
                            {showTranslation && conj.pronoun && <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>{conj.pronoun}</Typography>}
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontSize: '1.1rem' }}>
                          <Box id={`cellPast-${subCategory.id}-${index}`}>
                            <div>{conj.past}</div>
                            {showTranslation && conj.pastEnglish && <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>{conj.pastEnglish}</Typography>}
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontSize: '1.1rem' }}>
                          <Box id={`cellPresent-${subCategory.id}-${index}`}>
                            <div>{conj.present}</div>
                            {showTranslation && conj.presentEnglish && <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>{conj.presentEnglish}</Typography>}
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontSize: '1.1rem' }}>
                          <Box id={`cellImperative-${subCategory.id}-${index}`}>
                            <div>{conj.imperative || '-'}</div>
                            {showTranslation && conj.imperativeEnglish && <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>{conj.imperativeEnglish}</Typography>}
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontSize: '1.1rem' }}>
                          <Box id={`cellNegationPast-${subCategory.id}-${index}`}>
                            <div>لَمْ {conj.negationPast}</div>
                            {showTranslation && conj.negationPastEnglish && <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>{conj.negationPastEnglish}</Typography>}
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontSize: '1.1rem' }}>
                          <Box id={`cellNegationFuture-${subCategory.id}-${index}`}>
                            <div>لَنْ {conj.negationFuture}</div>
                            {showTranslation && conj.negationFutureEnglish && <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>{conj.negationFutureEnglish}</Typography>}
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontSize: '1.1rem' }}>
                          <Box id={`cellNegationJussive-${subCategory.id}-${index}`}>
                            <div>لا {conj.negationJussive}</div>
                            {showTranslation && conj.negationJussiveEnglish && <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>{conj.negationJussiveEnglish}</Typography>}
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontSize: '1.1rem' }}>
                          <Box id={`cellParticiple-${subCategory.id}-${index}`}>
                            <div>{conj.participle || '-'}</div>
                            {showTranslation && conj.participleEnglish && <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>{conj.participleEnglish}</Typography>}
                          </Box>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
        )}

        {/* Example Sentences */}
        {subCategory.exampleSentences.lam_male && (
          <Card id={`cardExampleSentences-${subCategory.id}`} sx={{ borderRadius: 2, boxShadow: 1 }}>
            <CardContent>
              <Box id={`containerExampleSentencesInner-${subCategory.id}`} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box id={`exampleSentenceLamMale-${subCategory.id}`} sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
                  <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
                    {subCategory.exampleSentences.lam_male}
                  </Typography>
                </Box>
                <Box id={`exampleSentenceLamFemale-${subCategory.id}`} sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
                  <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
                    {subCategory.exampleSentences.lam_female}
                  </Typography>
                </Box>
                <Box id={`exampleSentenceLanMale-${subCategory.id}`} sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
                  <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
                    {subCategory.exampleSentences.lan_male}
                  </Typography>
                </Box>
                <Box id={`exampleSentenceLanFemale-${subCategory.id}`} sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
                  <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
                    {subCategory.exampleSentences.lan_female}
                  </Typography>
                </Box>
                <Box id={`exampleSentenceMasdar-${subCategory.id}`} sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
                  <Typography variant="body1" sx={{ fontSize: '1.1rem', color: 'text.primary' }}>
                    {subCategory.exampleSentences.masdar}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        )}
      </Box>
    );
  };

  return (
    <Box id={`containerVerbCard-${data.id}`} sx={{ maxWidth: 1400, mx: 'auto', p: 3 }}>
      {/* Main Category Accordion */}
      <Accordion
        id={`accordionMainCategory-${data.id}`}
        expanded={expandedMain}
        onChange={() => setExpandedMain(!expandedMain)}
        sx={{
          mb: 0,
          '&:before': { display: 'none' },
          boxShadow: 3,
          borderRadius: 2,
          overflow: 'visible'
        }}
      >
        <AccordionSummary
          id={`accordionSummaryMain-${data.id}`}
          expandIcon={<ExpandMoreIcon />}
          sx={{
            bgcolor: 'background.paper',
            color: 'text.primary',
            '& .MuiAccordionSummary-content': {
              my: 2
            },
            '&:hover': {
              bgcolor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.02)'
            },
            textAlign: 'right',
            direction: 'rtl'
          }}
        >
          <Box id={`containerMainTitle-${data.id}`} sx={{ width: '100%' }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', textAlign: 'right' }}>
              📜 {data.arabic}
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9, mt: 1, textAlign: 'right' }}>
              {data.transliteration} - {data.english}
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails id={`accordionDetailsMain-${data.id}`} sx={{ p: 0 }}>
          {/* Explanation Card */}
          <Box id={`containerExplanation-${data.id}`} sx={{ p: 3, bgcolor: 'background.paper', color: 'text.primary', textAlign: 'left' }}>
            <Typography variant="body1" sx={{ lineHeight: 1.8, whiteSpace: 'pre-line' }}>
              {data.explanation}
            </Typography>
          </Box>

          {/* Sub-categories Grid */}
          <Box id={`containerSubCategoriesGrid-${data.id}`} sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: '1fr',
                  md: '1fr',
                  lg: '1fr',
                  xl: '1fr'
                },
                gap: 2,
                direction: 'rtl'
              }}
            >
              {data.subCategories.map((subCategory) => (
                <Box key={subCategory.id} sx={{ minWidth: 0 }}>
                  <Accordion
                    id={`accordionSubCategory-${subCategory.id}`}
                    expanded={expandedSubCategory === subCategory.id}
                    onChange={handleSubCategoryChange(subCategory.id)}
                    sx={{
                      boxShadow: 2,
                      '&:before': { display: 'none' },
                      borderRadius: 1
                    }}
                  >
                    <AccordionSummary
                      id={`accordionSummarySubCategory-${subCategory.id}`}
                      expandIcon={<ExpandMoreIcon />}
                      sx={{
                        bgcolor: 'background.paper',
                        color: 'text.primary',
                        '&:hover': {
                          bgcolor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.02)'
                        }
                      }}
                    >
                      <Box id={`containerSubCategoryTitle-${subCategory.id}`} sx={{ width: '100%', textAlign: 'center' }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'inherit' }}>
                          {subCategory.arabic} {subCategory.masdar}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                          {subCategory.meaning}
                        </Typography>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails id={`accordionDetailsSubCategory-${subCategory.id}`} sx={{ p: 0 }}>
                      {renderSubCategoryConjugation(subCategory)}
                    </AccordionDetails>
                  </Accordion>
                </Box>
              ))}
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
