#!/usr/bin/ruby

if ARGV.size < 2 then
  p "Usage: quark make name[,actions]"
  p "       name: quark name"
  p "       actions: actions which separated comma"
end

if ARGV[0] == "make" then
  name = ARGV[1]
  actions = (ARGV[2]||"open").split( "," )
  if !File.exist?(name) then
    Dir::mkdir(name)
  end
  if !File.exist?(name+"/render") then
    Dir::mkdir(name+"/render")
  end
  qf = []
  mf = []
  amaster = []
  mmaster = []
  qf << "quark.__quark__ = {"
  open(".template/action.txt").each do |i|
      amaster << i
  end
  
  mf << "quark.mock.__quark__= {"
  open(".template/mock.txt").each do |i|
      mmaster << i
  end
  acts = []
  mocs = []
  actions.each do|action|
    act = amaster.join("")
    moc = mmaster.join("")
    acts << act.gsub(/__action__/,action)
    mocs << moc.gsub(/__action__/,action)
    open(name+"/render/"+action+".ren", "w").write('<div id="'+name+"-"+action+'"></div>')
  end
  qf << acts.join(",\n")
  qf << "};"
  
  mf << mocs.join(",\n")
  mf << "};"
  
  q = open(name+"/"+name+".js", "w")
  qf.each do |i|
    q.write(i.gsub(/__quark__/,name)+"\n")
  end
  
  m = open(name+"/"+name+".mock.js", "w")
  mf.each do |i|
    m.write(i.gsub(/__quark__/, name)+"\n")
  end
  
end
    
