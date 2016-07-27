console.log(111);

var skills = 'CSS,HTML,HTML5,JavaScript,Android,AngularJS,React,Java,C,C++,C#,Scrum,BackboneJS,Python,Ruby,Linux,Git,MVC,MySQL,PostgreSQL,RethinkDB,NodeJS,Deepstream,ES5,ES6';
skills = skills.split(',');
var skillsLength = skills.length;
console.log(skills);

var skillClasses = 'smaller,small,medium,regular,large,larger';
skillClasses = skillClasses.split(',');
var skillClassesLength = skillClasses.length;

var skillsEl = document.getElementsByClassName('skills')[0];

for (var i = 0; i < skillsLength; i++) {
  var skillClass = Math.floor(Math.random() * (skillClassesLength - 0)) + 0;
  skillsEl.innerHTML += "<span class='" + skillClasses[skillClass] + "'>" + skills[i] + "</span>";
}

// skillsEl.innerHTML = 'asd';