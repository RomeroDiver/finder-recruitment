exports.getCurrentPageClassname = (href, currentPage) => href === currentPage ? 'main-nav__item--active' : '';
exports.ifIsEqual = (val1, val2, options) => val1 === val2 ? options.fn(this) : '';
