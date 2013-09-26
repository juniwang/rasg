// -----------------------------------------------------------------------
// <copyright file="SConfig.cs" company="Microsoft">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace sgll.net.Core
{
    using System;
    using System.Configuration;
    using System.Linq;
    using System.Text;
    using System.Collections.Generic;

    /// <summary>
    /// TODO: Update summary.
    /// </summary>
    public class SConfig
    {
        #region Fields
        /// <summary>
        /// sync object
        /// </summary>
        private static readonly object syncRoot = new object();

        /// <summary>
        /// the System.Configuration
        /// </summary>
        private static Configuration configuration;
        #endregion

        #region Static Fields

        /// <summary>
        /// Gets the configuration.
        /// </summary>
        private static Configuration Configuration
        {
            get
            {
                var result = configuration;
                if (result == null)
                {
                    lock (syncRoot)
                    {
                        return ConfigurationNoLock;
                    }
                }

                return result;
            }
        }

        /// <summary>
        /// Gets the configuration with nolock.
        /// </summary>
        private static Configuration ConfigurationNoLock
        {
            get
            {
                if (configuration == null)
                {
                    configuration = ConfigurationManager.OpenExeConfiguration(ConfigurationUserLevel.None);
                }

                return configuration;
            }
        }

        #endregion

        #region Static Methods

        /// <summary>
        /// refresh configuration
        /// </summary>
        public static void Refresh()
        {
            lock (syncRoot)
            {
                configuration = null;
            }
        }

        /// <summary>
        /// Gets the configuration section.
        /// </summary>
        /// <typeparam name="T">the type. must inherited from <see cref="System.Configuration.ConfigurationSection"/>.</typeparam>
        /// <returns>configuration section</returns>
        public static T GetConfigurationSection<T>()
            where T : class
        {
            return GetConfigurationSections<T>().FirstOrDefault();
        }

        /// <summary>
        /// Gets the configuration sections.
        /// </summary>
        /// <typeparam name="T">the type. must inherited from <see cref="System.Configuration.ConfigurationSection"/>.</typeparam>
        /// <returns>configuration section</returns>
        public static IEnumerable<T> GetConfigurationSections<T>()
            where T : class
        {
            lock (syncRoot)
            {
                return Configuration.Sections.OfType<T>();
            }
        }

        /// <summary>
        /// Gets the custom configuration.
        /// </summary>
        /// <typeparam name="T">the type</typeparam>
        /// <returns>custom configuration</returns>
        public static T GetCustomConfiguration<T>() where T : class, new()
        {
            return GetCustomConfiguration<T>(false);
        }

        /// <summary>
        /// Gets the custom configuration.
        /// </summary>
        /// <typeparam name="T">the type</typeparam>
        /// <param name="refresh">if set to <c>true</c> [refresh].</param>
        /// <returns>custom configuration</returns>
        public static T GetCustomConfiguration<T>(bool refresh) where T : class, new()
        {
            T result;
            if (!refresh)
            {
                result = CustomConfigurationCache<T>.Cache;
                if (result != null)
                {
                    return result;
                }
            }

            result = new T();
            CustomConfigurationCache<T>.Cache = result;
            return result;
        }

        /// <summary>
        /// Gets the config.
        /// </summary>
        /// <typeparam name="T">the type</typeparam>
        /// <param name="key">The key.</param>
        /// <param name="defaultValue">The default value.</param>
        /// <returns>
        /// the config
        /// </returns>
        public static T GetAppConfig<T>(string key, T defaultValue)
        {
            string configValue = GetAppConfig(key, string.Empty);
            try
            {
                return (T)Convert.ChangeType(configValue, typeof(T));
            }
            catch
            {
                return defaultValue;
            }
        }

        /// <summary>
        /// Gets the app config.
        /// </summary>
        /// <param name="key">The key.</param>
        /// <param name="defaultValue">The default value.</param>
        /// <returns>the app config</returns>
        public static string GetAppConfig(string key, string defaultValue)
        {
            return ConfigurationManager.AppSettings[key] ?? defaultValue;
        }

        /// <summary>
        /// Gets the app config.
        /// </summary>
        /// <param name="key">The key.</param>
        /// <param name="defaultValue">The default value.</param>
        /// <param name="comparison">The comparison.</param>
        /// <returns>the app config</returns>
        public static string GetAppConfig(string key, string defaultValue, StringComparison comparison)
        {
            if (comparison == StringComparison.InvariantCultureIgnoreCase)
            {
                return GetAppConfig(key, defaultValue);
            }

            foreach (var item in ConfigurationManager.AppSettings.AllKeys)
            {
                if (string.Equals(item, key, comparison))
                {
                    return ConfigurationManager.AppSettings[key] ?? defaultValue;
                }
            }

            return defaultValue;
        }

        #endregion

        #region Sub-class: CustomConfigurationCache<T>

        /// <summary>
        /// the custom configuration cache
        /// </summary>
        /// <typeparam name="T">the type</typeparam>
        private static class CustomConfigurationCache<T>
        {
            /// <summary>
            /// Gets or sets the cache.
            /// </summary>
            /// <value>
            /// The cache.
            /// </value>
            public static T Cache
            {
                get;
                set;
            }
        }

        #endregion
    }
}
