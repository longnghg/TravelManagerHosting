using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Travel.Context.Models
{
    public class Banner
    {
        private Guid idBanner;
        private bool isActive;

        public Guid IdBanner { get => idBanner; set => idBanner = value; }
        public bool IsActive { get => isActive; set => isActive = value; }
    }
}
