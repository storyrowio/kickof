// ** Util Import
import {HexToRGBA} from "utils/theme";

const List = () => {
  return {
    MuiListItemButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          paddingLeft: theme.spacing(5),
          paddingRight: theme.spacing(5),
          '&:hover': {
            backgroundColor: HexToRGBA(theme.palette.primary.main, 0.08),
          },
          '&.active': {
            '&, &:hover': {
              boxShadow: `0px 2px 6px ${HexToRGBA(theme.palette.primary.main, 0.2)}`,
              background: theme.palette.primary.main,
              '&.Mui-focusVisible': {
                background: `linear-gradient(72.47deg, ${theme.palette.primary.dark} 22.16%, ${HexToRGBA(
                    theme.palette.primary.dark,
                    0.7
                )} 76.47%)`
              }
            },
            '&:hover': {
              background: theme.palette.primary.dark,
            },
            '& .MuiTypography-root, & svg': {
              color: `${theme.palette.common.white} !important`
            }
          }
        })
      }
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: ({ theme }) => ({
          minWidth: '0 !important',
          marginRight: theme.spacing(2.25),
          color: theme.palette.text.primary
        })
      }
    },
    MuiListItemAvatar: {
      styleOverrides: {
        root: ({ theme }) => ({
          minWidth: 0,
          marginRight: theme.spacing(4)
        })
      }
    },
    MuiListItemText: {
      styleOverrides: {
        root: ({ theme }) => ({
          marginTop: theme.spacing(0.5),
          marginBottom: theme.spacing(0.5)
        }),
        dense: ({ theme }) => ({
          '& .MuiListItemText-primary': {
            color: theme.palette.text.primary
          }
        })
      }
    },
    MuiListSubheader: {
      styleOverrides: {
        root: ({ theme }) => ({
          textTransform: 'uppercase',
          color: theme.palette.text.disabled
        })
      }
    }
  }
}

export default List
