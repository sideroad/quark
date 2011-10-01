#!/usr/bin/ruby

if ARGV.size < 2 then
  p "Usage: quark make ${name} [,${actions}]"
  p "       name: quark name"
  p "       actions: actions which separated comma"
end

if ARGV[0] == "make" then
  name = ARGV[1]
  actions = (ARGV[2]||"open").split( "," )
  
end
    
