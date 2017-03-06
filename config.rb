require 'extensions/sitemap.rb'

###
## Site-wide settings
####

set :full_name, "Robin Andeer"
set :site_url, "http://www.robinandeer.com"
set :site_description, "I'm a software engineer, climber, INTP, and designer of websites. I develop tools to solve medical mysteries at SciLifeLab. This is my blog."
set :city, "Stockholm, Sweden"
set :google_analytics_tracking_id, "UA-18017148-1"
set :blog_title, "Unnamed"
set :blog_subtitle, "A collection of guides and thoughts"

# Time.zone = "UTC"

###
# Blog settings
###

activate :blog do |blog|
  # This will add a prefix to all links, template references and source paths
  blog.prefix = "blog"

  blog.permalink = ":year/:month/:day/:title.html"
  # Matcher for blog source files
  # blog.sources = "{year}-{month}-{day}-{title}.html"
  # blog.taglink = "tags/{tag}.html"
  blog.layout = "post"
  # blog.summary_separator = /(READMORE)/
  # blog.summary_length = 250
  # blog.year_link = "{year}.html"
  # blog.month_link = "{year}/{month}.html"
  # blog.day_link = "{year}/{month}/{day}.html"
  blog.default_extension = ".md"

  blog.tag_template = "blog/tag.html"
  blog.calendar_template = "blog/calendar.html"

  # Enable pagination
  blog.paginate = true
  blog.per_page = 10
  blog.page_link = "page/{num}"
end

page "/blog/feed.xml", layout: false

###
# Deployment settings
###

activate :deploy do |deploy|
  deploy.method = :git
  deploy.branch = "master"
end

###
# Page options, layouts, aliases and proxies
###

# With no layout
page "robots.txt", :layout => false
page "humans.txt", :layout => false

# Per-page layout changes:
#
# With no layout
# page "/path/to/file.html", layout: false
#
# With alternative layout
# page "/path/to/file.html", layout: :otherlayout
#
# A path which all have the same layout
# with_layout :admin do
#   page "/admin/*"
# end

# Proxy pages (http://middlemanapp.com/basics/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", locals: {
#  which_fake_page: "Rendering a fake page with a local variable" }

###
# Helpers
###

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

# Generate sitemap after build
activate :sitemap_generator

# Reload the browser automatically whenever files change
activate :livereload

# Emojis :-)
activate :gemoji, :size => 20, :style => "vertical-align: middle", :emoji_dir => "assets/img/emoji"

# Syntax highlighting
set :markdown_engine, :redcarpet
set :markdown, :fenced_code_blocks => true, :smartypants => true
activate :syntax, line_numbers: true

# Autoprefix CSS
activate :autoprefixer do |config|
  config.browsers = ['last 2 versions', 'Explorer >= 9']
  config.remove   = false
  config.cascade  = false
  config.inline   = true
end

# Pretty URLs
activate :directory_indexes

# Methods defined in the helpers block are available in templates
# helpers do
#   def some_helper
#     "Helping"
#   end
# end

set :css_dir, 'assets/css'
set :js_dir, 'assets/js'
set :images_dir, 'assets/img'

# Build-specific configuration
configure :build do
  # For example, change the Compass output style for deployment
  activate :minify_css

  # Minify Javascript on build
  # activate :minify_javascript

  # Enable cache buster
  # activate :asset_hash

  # Use relative URLs
  # activate :relative_assets

  # Or use a different image path
  # set :http_prefix, "/Content/images/"
end
