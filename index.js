function Job(company,title,feature,date,type,location,categories){
    this.company=company;
    this.title=title;
    this.feature=feature;
    this.date=date;
    this.type=type;
    this.location=location;
    this.categories=categories;
}
var categories=[
    'Frontend',
    'Backend',
    'Fullstack',
    'Junior',
    'Midweight',
    'Senior',
    'Python',
    'Ruby',
    'Javascript',
    'HTML',
    'CSS',
    'React',
    'Sass',
    'Vue',
    'Django',
    'RoR'
]
var jobs=[
    new Job(
        'Photosnap',
        'Senior Frontend Developer',
        true,
        new Date('December 17, 1999 03:24:00'),
        'Full Time',
        'USA only',
        ['Frontend','Senior','HTML','CSS','Javascript']
    ),
    new Job(
        'Manage',
        'Fullstack Developer',
        true,
        new Date('Wed Oct 14, 2020 13:04:59'),
        'Part Time',
        'Remote',
        ['Fullstack','Midweight','Python','React']
    ),
    new Job(
        'Account',
        'Junior Frontend Develper',
        false,
        new Date('December 17, 1999 03:24:00'),
        'Part Time',
        'USA only',
        ['Frontend','Junior','Javascript','React','Sass']
    ),
    new Job(
        'MyHome',
        'Junior Frontend Developer',
        false,
        new Date('December 17, 1999 03:24:00'),
        'Contract',
        'USA only',
        ['Frontend','Junior','CSS','Javascript']
    ),
    new Job(
        'Loop Studios',
        'Software Engineer',
        false,
        new Date('December 17, 1999 03:24:00'),
        'Full Time',
        'Worldwide',
        ['Fullstack','Midweight','Javascript','Ruby','Sass']
    ),
    new Job(
        'FaceIt',
        'Junior Backend Developer',
        false,
        new Date('December 17, 1999 03:24:00'),
        'Full Time',
        'UK only',
        ['Backend','Junior','Ruby','RoR']
    ),
    new Job(
        'Shortly',
        'Junior Developer',
        false,
        new Date('December 17, 1999 03:24:00'),
        'Full Time',
        'Worldwide',
        ['Frontend','Junior','HTML','Javascript','Sass']
    ),
    new Job(
        'Insure',
        'Junior Frontend Developer',
        false,
        new Date('December 17, 1999 03:24:00'),
        'Full Time',
        'USA only',
        ['Frontend','Junior','Javascript','Vue','Sass']
    ),
    new Job(
        'Eyecam Co.',
        'Full stack Engineer',
        false,
        new Date('December 17, 1999 03:24:00'),
        'Full Time',
        'Worldwide',
        ['Fullstack','Midweight','Javascript','Python','Django']
    ),
    new Job(
        'The Air Filter Company',
        'Front-end Dev',
        false,
        new Date('December 17, 1999 03:24:00'),
        'Part Time',
        'Worldwide',
        ['Frontend','Junior','Javascript','React','Sass']
    )
];

var selectedTag=[];
var filterfield=document.querySelector('#filterfield');
var select=document.querySelector('#select');
var triggerfocus=document.querySelector('#input');
var removeTag=document.querySelector('#clear');
var jobsview=document.querySelector('.jobs');

filterfield.addEventListener('keyup',(e)=>{
    clearSelectChild();
    if(filterfield.value!=''){
        renderOption(filterfield.value);
    }
});

removeTag.addEventListener('click',()=>{
    selectedTag=[];
    var children=document.querySelectorAll('.tag');
    jobsview.innerHTML='';
    children.forEach((child)=>{
        triggerfocus.removeChild(child);
    });
    filterfield.value="";
    clearSelectChild();
});

window.addEventListener('click',function(e){
    clearSelectChild();
});
window.onload=()=>{
    renderJobs(jobs);
}
document.querySelector('.filter').addEventListener('click',(e)=>{
    e.stopPropagation();
});

triggerfocus.addEventListener('click',()=>{
    filterfield.focus();
});


function renderOption(value){
    var match=categories.filter((v)=>{
        var re=new RegExp(value,'i');
        return v.match(re); 
    });
    console.log(match);
    if(match.length==0){
        var para=document.createElement('p');
        para.classList.add('null');
        var text=document.createTextNode('No match categories !');
        para.appendChild(text);
        select.appendChild(para);
    }else{
        match.forEach((e)=>{
            var para=document.createElement('p');
            para.classList.add('option');
            var text=document.createTextNode(e);
            para.appendChild(text);
            select.appendChild(para);
        })
        var options=document.querySelectorAll('.option');
        options.forEach((element)=>{
            element.addEventListener('click',(e)=>{
                var tag=e.currentTarget.innerHTML;
                if(selectedTag.indexOf(tag)==-1){
                    if(selectedTag.length<5){
                        addNewTag(tag);
                        selectedTag.push(tag);
                        console.log('can add');
                        jobsview.innerHTML='';
                        console.log(selectedTag);
                        renderJobs(filterjobs(jobs,selectedTag));
                    }else{
                        clearSelectChild();
                        alert('Maximum five tags allowed !')
                        filterfield.value="";
                        filterfield.focus();
                    }
                }else{
                    clearSelectChild();
                    filterfield.value="";
                    filterfield.focus();
                }               
            })
        });
    }
    
}

function clearSelectChild(){
    select.innerHTML=''
}
function addNewTag(tag){
    var filterfield=document.querySelector('#filterfield')
    var input=document.querySelector('#input');
    var newdiv=document.createElement('div');
    newdiv.classList.add('tag');
    var firstspan=document.createElement('span');
    firstspan.setAttribute('id','text');
    var text=document.createTextNode(tag);
    firstspan.appendChild(text);
    var secondspan=document.createElement('span');
    secondspan.setAttribute('id','remove');
    secondspan.classList.add('remove');
    secondspan.innerHTML='<i class="fas fa-times"></i>'
    newdiv.appendChild(firstspan);
    newdiv.appendChild(secondspan);
    input.insertBefore(newdiv,filterfield);
    secondspan.addEventListener('click',(e)=>{
        selectedTag=selectedTag.filter((t)=>{
            return t!=tag;
        });
        input.removeChild(e.currentTarget.parentNode);
        console.log(selectedTag);
        renderJobs(jobs);
    })
    filterfield.value='';
    filterfield.focus();
    clearSelectChild();
}

function renderJobs(jobs){

    jobs.forEach((j)=>{
        var job=document.createElement('div')
        job.classList.add('job');
        var left=document.createElement('div');
        left.classList.add('left');
        var right=document.createElement('div');
        right.classList.add('right');
        var avator=document.createElement('div');
        avator.classList.add('avator');
        var jobinfo=document.createElement('div');
        jobinfo.classList.add('jobinfo');
        var company=document.createElement('div');
        company.classList.add('company');
        var companyname=document.createElement('span');
        companyname.classList.add('company-name');
        var name=document.createElement('div');
        name.classList.add('name');
        var additional=document.createElement('div');
        additional.classList.add('additional');
        var date=document.createElement('span');
        date.classList.add('date');
        var type=document.createElement('span');
        type.classList.add('type');
        var location=document.createElement('span');
        location.classList.add('date');

        var namenode=document.createTextNode(j.title);
        var companynamenode=document.createTextNode(j.company);
        var typenode=document.createTextNode(j.type);
        var locationnode=document.createTextNode(j.location);
        
        company.appendChild(companyname);
        var datenode=document.createTextNode(calculateDate(j.date,company));
        date.appendChild(datenode);
        type.appendChild(typenode);
        location.appendChild(locationnode);
        additional.appendChild(date);
        additional.appendChild(type);
        additional.appendChild(location);
        name.appendChild(namenode);
        companyname.appendChild(companynamenode);
        jobinfo.appendChild(company);
        jobinfo.appendChild(name);
        jobinfo.appendChild(additional);
        left.appendChild(avator);
        left.appendChild(jobinfo);
        job.appendChild(left);
        job.appendChild(right); 
        jobsview.appendChild(job);
       
        j.categories.forEach((category)=>{
            var tag=document.createElement('span');
            tag.classList.add('tag');
            var text=document.createTextNode(category);
            tag.appendChild(text);
            right.appendChild(tag);
        });
    });
}

function calculateDate(date,parent){
    var now=new Date();
    var second=(Math.abs(now-date))/1000;//millisecond
    var year=Math.round(second/31536000);
    second=second%31536000;
    var month=Math.round(second/2592000);
    second=second%2592000;
    var day=Math.round(second/86400);
    second=second%86400;
    var hour=Math.round(second/3600);
    second=second%3600;
    var min=Math.round(second/60);
    second=second%60;
    if(year!=0){
        return year+'y ago';
    }
    if(month!=0){
        return month+ 'm ago';
    }
    if(day!=0){
        return day+'d ago';
    }
    if(hour!=0){
        return hour+'h ago';
    }
    if(min!=0){
        if(min<60){
            var isnew=document.createElement('span');
            isnew.classList.add('new');
            isnew.appendChild(document.createTextNode('New'));
            parent.appendChild(isnew);
        }
        return min+'m ago';
    }
    return 'now';
}

function filterjobs(jobs,selectedTag){
    var newjobs=jobs.filter((job)=>{
        let involve=false;
        for(let i=0;i<selectedTag.length;i++){
            if(job.categories.indexOf(selectedTag[i])==-1){
                involve=false;
                break;
            }else{
                involve=true;
            }
        }
        return involve;
    })
    return newjobs;
}

// var filtertags=document.querySelectorAll('span.remove');
// // filtertags.forEach((filtertag)=>{
// //     filtertag.addEventListener('click',(e)=>{
// //         console.log(e.target);
// //     })
// // })
// console.log(filtertags);