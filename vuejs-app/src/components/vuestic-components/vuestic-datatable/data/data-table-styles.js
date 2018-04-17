export default {
  table: {
    tableClass: 'table table-striped',
    ascendingIcon: 'entypo entypo-up-dir',
    descendingIcon: 'entypo entypo-down-dir'
  },
  pagination: {
    small: {
      wrapperClass: 'btn-group',
      activeClass: 'focus',
      disabledClass: 'disabled',
      pageClass: 'btn btn-primary btn-sm hide-not-focused-btn',
      linkClass: 'btn btn-primary btn-sm pagination-link-btn',
      icons: {
        first: 'fa fa-angle-double-left',
        prev: 'fa fa-angle-left',
        next: 'fa fa-angle-right',
        last: 'fa fa-angle-double-right'
      }
    },
    micro: {
      wrapperClass: 'btn-group',
      activeClass: 'focus',
      disabledClass: 'disabled',
      pageClass: 'btn btn-primary btn-micro hide-not-focused-btn',
      linkClass: 'btn btn-primary btn-micro pagination-link-btn',
      icons: {
        first: 'fa fa-angle-double-left',
        prev: 'fa fa-angle-left',
        next: 'fa fa-angle-right',
        last: 'fa fa-angle-double-right'
      }
    }
  }
}
