const Accordion = () => {
  return {
    MuiAccordion: {
      styleOverrides: {
        root: ({ theme }) => ({
          margin: theme.spacing(2, 0),
          '&:before': { display: 'none' },
          borderRadius: theme.shape.borderRadius,
          transition: 'box-shadow .35s ease, margin .35s ease',
          boxShadow: theme.shadows[2],
          '&.Mui-expanded': {
            margin: theme.spacing(2, 0),
            boxShadow: theme.shadows[7]
          },
          '& .MuiCollapse-root': {
            minHeight: 'unset !important',
            transition: 'height .35s ease !important',
            '&.MuiCollapse-entered': {
              height: 'auto !important'
            }
          }
        })
      }
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontWeight: 500,
          borderRadius: 'inherit',
          padding: `0 ${theme.spacing(4.5)}`,
          '& + .MuiCollapse-root': {
            '& .MuiAccordionDetails-root:first-child': {
              paddingTop: 0
            }
          },
          '&.Mui-expanded': {
            minHeight: 'unset',
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            '& .MuiAccordionSummary-content': {
              margin: theme.spacing(3.25, 0)
            }
          },
          '& .MuiTypography-root': {
            fontWeight: 500
          }
        }),
        content: ({ theme }) => ({
          margin: theme.spacing(3.25, 0)
        }),
        expandIconWrapper: ({ theme }) => ({
          color: theme.palette.text.primary
        })
      }
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: ({ theme }) => ({
          padding: theme.spacing(4.5),
          '& + .MuiAccordionDetails-root': {
            paddingTop: 0
          }
        })
      }
    }
  }
}

export default Accordion
