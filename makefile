JSX_COMPILES_DIR := jsx_compiles

all: app.js
	nodemon app.js


################### Pages

##$(JSX_COMPILES_DIR)/changeticket.jsx.js: src/pages/changeticket.jsx $(JSX_COMPILES_DIR)/layout.jsx.js | $(JSX_COMPILES_DIR)
##	babel -o $(JSX_COMPILES_DIR)/$(notdir $@) $<

#jsx: | $(JSX_COMPILES_DIR)

################# Layouts

#$(JSX_COMPILES_DIR)/layout.jsx.js: src/components/layout/layout.jsx $(JSX_COMPILES_DIR)/small_banner.jsx.js $(JSX_COMPILES_DIR)/footer.jsx.js | $(JSX_COMPILES_DIR)
#	babel -o $(JSX_COMPILES_DIR)/$(notdir $@) $<

################# Components

#$(JSX_COMPILES_DIR)/small_banner.jsx.js: src/components/small_banner/small_banner.jsx | $(JSX_COMPILES_DIR)
#	babel -o $(JSX_COMPILES_DIR)/$(notdir $@) $<
#
#$(JSX_COMPILES_DIR):
#	mkdir -p $@
