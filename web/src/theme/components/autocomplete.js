// ** Util Import
import {HexToRGBA} from "utils/theme";

const Autocomplete = skin => {
  const boxShadow = theme => {
    if (skin === 'bordered') {
      return theme.shadows[0]
    } else if (theme.palette.mode === 'light') {
      return theme.shadows[4]
    } else return '0px 3px 14px 0px rgba(15, 20, 34, 0.38)'
  }

  return {
    MuiAutocomplete: {
      styleOverrides: {
        popper: ({ theme }) => ({
          '.MuiPaper-root': {
            boxShadow: boxShadow(theme),
            ...(skin === 'bordered' && { border: `1px solid ${theme.palette.divider}` }),
            '& .MuiAutocomplete-option .MuiListItemButton-root:hover': {
              backgroundColor: 'transparent'
            },
            '&.custom-autocomplete-paper': {
              ...theme.typography.body1,
              '& .MuiAutocomplete-option': {
                '&.Mui-focused': {
                  color: theme.palette.primary.main,
                  backgroundColor: HexToRGBA(theme.palette.primary.main, 0.08),
                  '& .MuiTypography-root, & svg': {
                    color: 'inherit'
                  }
                },
                '&[aria-selected="true"]': {
                  color: theme.palette.common.white,
                  backgroundColor: theme.palette.primary.main,
                  '& .MuiTypography-root, & svg': {
                    color: 'inherit'
                  }
                },
                '& .MuiCheckbox-root.Mui-checked path:first-of-type': {
                  fill: theme.palette.common.white
                },
                '& .MuiCheckbox-root.Mui-checked path:last-of-type': {
                  fill: theme.palette.primary.main,
                  stroke: theme.palette.primary.main
                }
              }
            }
          }
        }),
        inputRoot: {
          paddingTop: 0,
          paddingBottom: 0,
          '& .MuiAutocomplete-tagSizeSmall': {
            height: 22
          }
        },
        tag: ({ theme }) => ({
          height: 25,
          borderRadius: 7,
          backgroundColor: HexToRGBA(theme.palette.primary.dark, 0.25)
        })
      }
    }
  }
}

export default Autocomplete
