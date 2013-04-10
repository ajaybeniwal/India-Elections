using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using India_Elections.Models;

namespace India_Elections.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index(ModelURL url)
        {
            if (url != null)
            {
                string urlrecieved = url._escaped_fragment_;
                if (!string.IsNullOrEmpty(urlrecieved))
                {
                    string[] routearray = urlrecieved.Split('/');
                    if (routearray.Length == 2)
                    {
                        return View("Home");
                    }
                    if (routearray.Length == 3)
                    {
                        string viewname = routearray[2].ToString();
                        return View(viewname);
                    }
                    else if (routearray.Length == 4)
                    {
                        string viewfirstpartname = routearray[2].ToString();
                        string viewsecondpartname = routearray[3].ToString();
                        return View(viewfirstpartname + viewsecondpartname);
                    }
                }
            }
            return View();
            
        }

       
    }
}
