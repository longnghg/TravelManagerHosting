using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;
using PrUtility;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.Json;
using Travel.Data.Interfaces;
using Travel.Shared.ViewModels;

namespace TravelApi.Controllers
{
    public class AuthenticationController : Controller
    {
        private IConfiguration configuration;
        private IAuthentication authentication;
        private Responsive res;
        public AuthenticationController(IConfiguration _configuration, IAuthentication _authentication)
        {
            configuration = _configuration;
            authentication = _authentication;
            res = new Responsive();
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("EmpLogin")]
        public object EmpLogin([FromBody] JObject frmData)
        {
            try
            {
                string email = PrCommon.GetString("email", frmData);
                string password = PrCommon.GetString("password", frmData);
                var result = authentication.EmpLogin(email);
                if (result != null)
                {
                    if (result != null)
                    {
                        var isNew = authentication.EmpIsNew(email);
                        if (isNew)
                        {
                            var active = authentication.EmpActive(email);
                            if (active)
                            {
                                var claim = new[]
                                {
                                    new Claim(JwtRegisteredClaimNames.Sub, configuration["Token:Subject"]),
                                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                                    new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                                    new Claim(JwtRegisteredClaimNames.Aud, configuration["Token:Audience"]),
                                    new Claim(ClaimTypes.Role, result.RoleId.ToString()),
                                    new Claim("EmployeeId", result.Id.ToString())
                                };

                                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Token:key"]));
                                var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                                var token = new JwtSecurityToken(configuration["Token:Issuer"],
                                    configuration["Token:Audience"], claim, expires: DateTime.UtcNow.AddMinutes(60),
                                    signingCredentials: signIn);

                                var tokenJWT = new JwtSecurityTokenHandler().WriteToken(token);

                                authentication.EmpAddToken(tokenJWT, result);

                                Authentication auth = new Authentication();
                                auth.Token = tokenJWT;
                                auth.RoleId = result.RoleId.ToString();
                                auth.EmployeeId = result.Id.ToString();
                                auth.EmployeeName = result.Name;
                                auth.EmployeeImg = result.Image;


                                res.Content = JsonSerializer.Serialize(auth);
                                res.Status = 200;
                                res.Notification.DateTime = DateTime.Now;
                                res.Notification.Description = null;
                                res.Notification.Messenge = "Đăng nhập thành công !";
                                res.Notification.Type = "Success";

                                return Ok(res);
                            }
                            else
                            {
                                res.Notification.DateTime = DateTime.Now;
                                res.Notification.Description = null;
                                res.Notification.Messenge = "Tài khoản của bạn chưa được kích hoạt !";
                                res.Notification.Type = "Error";
                                return Ok(res);
                            }
                        }
                        else
                        {
                            res.Notification.DateTime = DateTime.Now;
                            res.Notification.Description = null;
                            res.Notification.Messenge = "Tài khoản của bạn chưa xác nhận email !";
                            res.Notification.Type = "Error";
                            return Ok(res);
                        }

                    }
                    else
                    {
                        res.Notification.DateTime = DateTime.Now;
                        res.Notification.Description = null;
                        res.Notification.Messenge = "Sai mật khẩu !";
                        res.Notification.Type = "Error";
                        return Ok(res);
                    }

                }
                else
                {
                    res.Notification.DateTime = DateTime.Now;
                    res.Notification.Description = null;
                    res.Notification.Messenge = "Sai mật khẩu !";
                    res.Notification.Type = "Error";
                    return Ok("Không tìm thấy email [" + email + "] trên hệ thống !");
                }
            }
            catch (Exception e)
            {
                res.Notification.DateTime = DateTime.Now;
                res.Notification.Description = e.Message;
                res.Notification.Messenge = "Đăng nhập thất bại !";
                res.Notification.Type = "Error";
                return Ok(res);
            }

        }
    }
}
